
export function Input(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Value: '',
        Type: 'text',
        Tags: '',
        NestedLabelFor: ''
    };
    params = {...defaultParams, ...params};

    return `
        <div class="form-group" id="helper_${params.Id}">
            <label for="${params.Id}" data-nested-list-label-for="${params.NestedLabelFor}">${params.Text}</label>
            <input
                type="${params.Type}"
                ${params.Tags}
                class="form-control"
                id="${params.Id}"
                value="${_.escape(params.Value)}"
            >
            <span class="help-block"></span>
        </div>
    `;
}
