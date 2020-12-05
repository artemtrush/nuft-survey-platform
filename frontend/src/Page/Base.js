import api                              from '../apiSingleton';
import Session                          from "../Module/Session";
import config                           from "../Utils/Config";
import isFunction                       from 'lodash/isFunction';
import Modal                            from "./Modal";
import Cache                            from "../Utils/Cache";
import Component                        from "../Component";
import * as MathUtils                   from "../Utils/Math";
import * as DateUtils                   from "../Utils/Date";
import * as PageUtils                   from "../Utils/Page";
import * as FormUtils                   from "../Utils/Form";
import * as FileUtils                   from "../Utils/File";
import * as CollectionUtils             from "../Utils/Collection";
import * as ValidatorUtils              from "../Utils/Validator";

export default class Base {

    ITEMS_PER_PAGE = 10;

    constructor(params) {
        if (typeof (params) === 'object') {
            for (const k in params) {
                this[k] = params[k];
            }
        }

        this.definePageModules();
        this.defineCustomFunctions();
    }

    definePageModules()    {
        this.api = api;
        this.cache = new Cache();
        this.component = Component();

        this.math = MathUtils;
        this.date = DateUtils;
        this.page = PageUtils;
        this.pathFor = PageUtils.pathFor;
        this.form = FormUtils;
        this.file = FileUtils;
        this.collection = CollectionUtils;
        this.validator = ValidatorUtils;
    }

    defineCustomFunctions()    {
        $.fn.offon = function (event, target, cb) {
            if (!target) {
                $(this).off(event).on(event, cb);
            } else {
                $(this).off(event, target).on(event, target, cb);
            }
            return $(this);
        };
    }

    loggedUser() {
        return Storage.get('User');
    }

    reload()    {
        window.location.reload();
    }

    redirect(url)    {
        window.location.hash = url;
    }

    async display() {
        const content = this.render();
        if (content === false) {
            return;
        }

        const header = this.header();
        $(".content-header").html(`<h1>${header}</h1>`);
        this.displayContent(content);

        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();

        await this.init();
        await this.bindEvents();
    }

    displayContent(content) {
        if (this instanceof Modal) {
            $('#modals').html(content);
        } else if ($('.main-content').length) {
            $(".main-content").html(content);
        } else {
            $("#content").html(content);
        }

        this.page.runContentOnLoadCallbacks();
    }

    async reset() {
        const content = this.render();
        if (content === false) {
            return;
        }

        this.displayContent(content);

        await this.init();
        await this.bindEvents();
    }

    header() {
        return '';
    }
    content() {
        return '';
    }

    async init() {}
    async bindEvents() {}
    async getState() {
        return {};
    }

    render() {
        this.page.startCollectingContentOnLoadCallbacks();

        const state = this.getState() || {};
        let content = this.content();

        for (const stateKey in state) {
            const stateValue = state[stateKey];

            content = content.replace(`{{${stateKey}}}`, stateValue);
        }

        return content;
    }



    /* DataTable */

    getDataTableTemplate(theadHtml) {
        return `
            <div class="box">
                <div class="box-body table-responsive">
                    <table class="table table-bordered table-hover" id="data-table">
                        <thead>
                            <trF>
                                ${theadHtml}
                            </tr>
                        </thead>
                    </table>
                </div>
            </divF>
        `;
    }

    async initDataTable({
        selector = '#data-table',
        columns,
        apiUrl,
        dataColumn,
        order,
        dataCallback = null,
        extra = {},
        actions = [],
        scrollX = false,
        scrollCollapse = false,
        columnDefs = [],
        filterColumns = []
    }) {
        this.dataTableSelector = selector;
        this.dataTableColumns = columns;

        const dataTable = $(selector).DataTable({
            paging: true,
            lengthChange: false,
            pageLength: this.ITEMS_PER_PAGE,
            searching: true,
            info: false,
            scrollX,
            scrollCollapse,
            columnDefs,
            autoWidth: true,
            language: this.getDataTableLanguage(),
            processing: true,
            serverSide: true,
            bInfo: false,
            ajax: {
                url: `${config.API_URL + config.API_PREFIX}/${apiUrl}`,
                dataSrc: json => {
                    if (json.Error && json.Error.Type && json.Error.Type == 'ACCESS_DENIED') {
                        return this.page.abortAccessDenied();
                    }

                    json.recordsTotal = json.TotalCount;
                    json.recordsFiltered = json.RecordsFiltered;

                    this.renderDataTableColumnsTotals(json);

                    return json[dataColumn];
                },
                data: data => {
                    let queryData = this.buildDataTableQueryParams({ data, extra, filterColumns });
                    if (isFunction(dataCallback)) {
                        queryData = dataCallback(queryData);
                    }
                    return queryData;
                },
                beforeSend(request) {
                    request.setRequestHeader('Authorization', Session.getJWT());
                }
            },
            columns,
            searchCols: [ {'search': 'active'}, null ],
            order,
            dom: '<flit<"dataTables_actions">p>',
            initComplete: () => {
                this.renderDataTableActions(actions);
                this.renderDataTableFilterColumns(dataTable, filterColumns);
            }
        });

        await this.page.resizeTables();

        return dataTable;
    }

    renderDataTableColumnsTotals(json) {
        if (json.Totals) {
            const totalsClass = 'data-table-totals';
            let $totalsRow = $(`.${totalsClass}`);
            if (!$totalsRow.length) {
                const $headRow = $(`${this.dataTableSelector} thead tr`);
                $totalsRow = $('<tr></tr>').addClass(totalsClass);
                $('th', $headRow).each(() => {
                    $totalsRow.append($('<th></th>'));
                });
                $totalsRow.insertAfter($headRow);
            }

            $.each(json.Totals, (columnName, columnTotal) => {
                const columnIndex = this.findDataTableColumnIndexByName(columnName);
                $( $('th', $totalsRow).get(columnIndex) ).text(columnTotal);
            });
        }
    }

    renderDataTableActions(actions) {
        if (actions !== null) {
            $('.dataTables_actions').html(actions);
        }
    }

    renderDataTableFilterColumns(dataTable, filterColumns) {
        if (filterColumns) {
            $.each(filterColumns, ( columnName, options ) => {
                const columnIndex = this.findDataTableColumnIndexByName(columnName);
                const columnLabel = $($(`${this.dataTableSelector} th`).get(columnIndex)).text();

                const $select = $(`
                        <select class="form-control" style="margin-right:20px;">
                            <option value="">${columnLabel} (Все)</option>
                        </select>
                    `)
                    .prependTo(`${this.dataTableSelector}_filter`)
                    .on('change', function () {
                        const filterValue = $(this).val().trim();

                        dataTable
                            .column(columnIndex)
                            .search( filterValue ? filterValue : '', false, true )
                            .draw();
                    });

                $.each(options, (value, text) => {
                    $select.append( '<option value="' + value + '">' + text + '</option>' );
                });
            });
        }
    }

    getDataTableLanguage() {
        return {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возростанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            }
        };
    }

    findDataTableColumnIndexByName(columnName) {
        const columns = this.dataTableColumns;

        let numberedIndex = 0;
        $.each(columns, (columnIndex, columnData) => {
            if (columnData.name === columnName) {
                numberedIndex = columnIndex;
            }
        });
        return numberedIndex;
    }

    buildDataTableQueryParams({
        data,
        limit = this.ITEMS_PER_PAGE,
        extra = {},
        filterColumns = {}
    }) {
        const page = (data.start / limit) + 1;
        const sortField = data.columns[ data.order[0].column ].name;

        const filterData = {};
        $.each(filterColumns, (columnName) => {
            const columnIndex = this.findDataTableColumnIndexByName(columnName);
            filterData[ columnName ] = data.columns[ columnIndex ].search.value;
        });

        const params = {
            'Limit': limit,
            'Page': page,
            'Search': data.search.value,
            'Filter': filterData,
            'SortField': sortField,
            'SortOrder': data.order[0].dir
        };

        return {...params, ...extra};
    }
}
