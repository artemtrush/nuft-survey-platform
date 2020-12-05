export function DropdownButton(params) {
    const defaultParams = {
        Id: '',
        Items: []
    };
    params = {...defaultParams, ...params};

    let html = '';

    $.each(params.Items, (idx, item) => {
        const defaultItem = {
            Text: '',
            Callback: null
        };
        item = {...defaultItem, ...item};

        const itemId = `dropdown-${params.Id}-item-${idx}`;

        if (item.Callback) {
            $(document).offon('click', `#${itemId}`, e => {
                e.preventDefault();
                item.Callback();
            });
        }

        html += `
            <li>
                <a href="#" id="${itemId}">
                    ${item.Text}
                </a>
            </li>
        `;
    });

    if (!html) {
        return '';
    }

    return `
        <div class="dropdown-button" style="text-align:center">
            <div class="btn-group-vertical">
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        ${html}
                    </ul>
                </div>
            </div>
        </div>
    `;
}
