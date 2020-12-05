import {addContentOnLoadCallback} from '../Utils/Page';

function formatSelectOptions(options) {
    const formattedOptions = [];
    $.each(options, (idx, option) => {
        const defaultOption = {
            Value: '',
            Text: '',
            Tags: '',
            Selected: false
        };
        option = {...defaultOption, ...option};

        formattedOptions.push(`
            <option
                value="${option.Value}"
                ${option.Tags}
                ${option.Selected ? 'selected' : ''}
            >
                ${option.Text}
            </option>
        `);
    });

    return formattedOptions.join('');
}

export function Select(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Disabled: false,
        Options: [],
        OptionsLoader: null
    };
    params = {...defaultParams, ...params};

    function reloadOptions() {
        params.OptionsLoader().then((options) => {
            $(`select#${params.Id}`).empty().append(formatSelectOptions(options)).trigger('change');
        });
    }

    if (params.OptionsLoader) {
        addContentOnLoadCallback(async () => {
            $(`select#${params.Id}`).offon('reloadOptions', null, () => {
                reloadOptions();
            });

            reloadOptions();
        });
    }

    return `
        <div class="form-group" id="helper_${params.Id}">
            <label for="${params.Id}">${params.Text}</label>
            <select
                class="form-control"
                id="${params.Id}"
                ${params.Disabled ? 'disabled' : ''}
            >
                ${formatSelectOptions(params.Options)}
            </select>
            <span class="help-block"></span>
        </div>
    `;
}
