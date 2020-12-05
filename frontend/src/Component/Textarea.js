export function Textarea(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Value: ''
    };
    params = {...defaultParams, ...params};

    return `
        <div class="form-group" id="helper_${params.Id}">
            <label for="${params.Id}">${params.Text}</label>
            <textarea class="form-control" id="${params.Id}">${params.Value}</textarea>
            <span class="help-block"></span>
        </div>
    `;
}
