import {toInt} from '../Utils/Math';

export function getTable(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Headers: [],
        AddBtnText: 'Добавить',
        AddBtnCallback: null
    };
    params = {...defaultParams, ...params};

    if (params.AddBtnCallback) {
        $(document).offon('click', `.js-add-${params.Id}-btn`, e => {
            e.preventDefault();
            params.AddBtnCallback();
        });
    }

    return `
        <div class="form-group" id="helper_${params.Id}">
            <label for="${params.Id}">${params.Text}</label>
            <span class="help-block"></span>
            <table class="table table-dark-bordered" id="${params.Id}">
                <thead>
                    <tr>
                        ${
                            Object.values(params.Headers).
                                map((header) => {
                                    const defaultHeader = {
                                        Text: '',
                                        NestedLabelFor: ''
                                    };
                                    header = {...defaultHeader, ...header};

                                    return `
                                        <th data-nested-list-label-for="${header.NestedLabelFor}">
                                            ${header.Text}
                                        </th>
                                    `;
                                })
                                .join('')
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <button type="button" class="btn btn-secondary js-add-${params.Id}-btn">
                ${params.AddBtnText}
            </button>
            <br/><br/>
        </div>
    `;
}

export function getAddRowFunction(params) {
    const defaultParams = {
        TableId: '',
        DataFields: []
    };
    params = {...defaultParams, ...params};

    $(document).offon('click', `.js-delete-${params.TableId}-row`, e => {
        e.preventDefault();
        $(e.target).closest('tr').remove();
    });

    return function (data = null) {
        const row = `
            <tr data-${params.TableId}-id="${data && data.Id ? data.Id : 0}">
                ${
                    Object.values(params.DataFields).
                        map((field) => {
                            const defaultField = {
                                Name: '',
                                Generator: null
                            };
                            field = {...defaultField, ...field};

                            let fieldValue = '';
                            if (data && field.Name in data) {
                                fieldValue = data[ field.Name ];
                            } else if (data) {
                                fieldValue = data;
                            }

                            return `
                                <td data-${params.TableId}-name="${field.Name}">
                                    ${ field.Generator ? field.Generator(fieldValue) : '' }
                                </td>
                            `;
                        })
                        .join('')
                }
                <td>
                    <button type="button" class="form-control btn btn-danger btn-sm js-delete-${params.TableId}-row">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        `;

        $(`#${params.TableId} tbody`).append(row);
    };
}

export function getItems(tableId, propertyValueHandler = null) {
    const items = [];

    $(`#${tableId} tbody tr`).each(function () {
        const $row = $(this);
        const item = {};

        const itemId = toInt($row.attr(`data-${tableId}-id`));
        if (itemId) {
            item.Id = itemId;
        }

        $('td', $row).each(function () {
            const $cell = $(this);

            const propertyName = $cell.attr(`data-${tableId}-name`);
            if (propertyName) {
                let propertyValue = null;
                ['input', 'select', 'textarea'].forEach(fieldType => {
                    const $field = $(fieldType, $cell).first();
                    if ($field.length) {
                        if (propertyValueHandler) {
                            propertyValue = propertyValueHandler(propertyName, $field);
                        } else {
                            propertyValue = $field.val();
                        }
                    }
                });

                item[ propertyName ] = propertyValue;
            }
        });

        items.push(item);
    });

    return items;
}
