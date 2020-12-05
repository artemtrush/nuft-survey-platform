
export function Checkbox(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Checked: false
    };
    params = {...defaultParams, ...params};

    return `
        <div class="checkbox checkbox-component" id="helper_${params.Id}">
            <label for="${params.Id}">
                <input id="${params.Id}" type="checkbox" ${params.Checked ? 'checked' : ''}>
                ${params.Text}
            </label>
            <span class="help-block"></span>
        </div>
    `;
}
