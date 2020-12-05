
export function NestedErrorBlock(params) {
    const defaultParams = {
        Id: ''
    };
    params = {...defaultParams, ...params};

    return `
        <div class="form-group" id="helper_${params.Id}">
            <span class="help-block"></span>
        </div>
    `;
}
