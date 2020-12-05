
export function getContainer(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        SelectAllButton: true
    };
    params = {...defaultParams, ...params};

    return `
        <div class="form-group checkbox-list" id="helper_${params.Id}">
            <label for="${params.Id}">${params.Text}</label>
            <span class="help-block"></span>
            ${params.SelectAllButton ? `
                <button type="button" class="btn btn-secondary checkbox-select-all">Выбрать все</button>
            ` : ''}
            <div id="${params.Id}"></div>
        </div>
    `;
}

export function setListItems(params) {
    const defaultParams = {
        Id: '',
        Items: [],
        CheckedIds: []
    };
    params = {...defaultParams, ...params};

    let html = '';
    $.each(params.Items, (idx, item) => {
        const defaultItem = {
            Id: '',
            Name: ''
        };
        item = {...defaultItem, ...item};

        const checked = params.CheckedIds ? params.CheckedIds.includes(item.Id) : false;

        html += `
            <div class="checkbox">
                <label>
                    <input type="checkbox" class="permission" value="${item.Id}" ${checked ? 'checked' : ''}>
                    ${item.Name}
                </label>
            </div>
        `;
    });

    $(`#${params.Id}`).html(html);

    $('button.checkbox-select-all').offon('click', null, function () {
        const $container = $(this).closest('.checkbox-list');
        $('input', $container).prop('checked', true);
    });
}

export function getItemsIds(listId) {
    const ids = [];

    $(`#${listId} input[type="checkbox"]:checked`).each(function () {
        ids.push($(this).val());
    });

    return ids;
}
