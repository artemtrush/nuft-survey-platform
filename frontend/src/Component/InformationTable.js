import {toDecimal} from '../Utils/Math';

export function InformationTable(params) {
    const defaultParams = {
        Title: '',
        Header: [],
        Rows: [],
        AutoWidth: false
    };
    params = {...defaultParams, ...params};

    let headerHtml = '';
    const colWidth = params.AutoWidth ? 'auto' : toDecimal(100 / params.Header.length);
    $.each(params.Header, (idx, headerCol) => {
        headerHtml += `<th style="width:${colWidth}%">${headerCol}</th>`;
    });

    let rowsHtml = '';
    $.each(params.Rows, (idx, row) => {
        let rowHtml = '';
        $.each(row, (key, value) => {
            rowHtml += `<td>${value}</td>`;
        });
        rowsHtml += `<tr>${rowHtml}</tr>`;
    });

    return `
        <div>
            <label>${params.Title}</label>
            <table class="table table-dark-bordered">
                <thead>
                    <tr>
                        ${headerHtml}
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}
