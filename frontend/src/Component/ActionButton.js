export function ActionButton(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Action: null,
        ButtonClass: 'btn-warning'
    };
    params = {...defaultParams, ...params};

    if (params.Action) {
        $(document).offon('click', `#${params.Id}`, async e => {
            e.preventDefault();
            const result = await params.Action();

            let resultMessage = '';
            if (result && 'Status' in result) {
                resultMessage = `
                    <div class="alert ${result.Status ? 'alert-success' : 'alert-danger'} alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h4>
                            <i class="icon fa ${result.Status ? 'fa-check' : 'fa-ban'}"></i>
                            ${result.Header ? result.Header : ''}
                        </h4>
                        ${result.Body ? result.Body : ''}
                    </div>
                `;
            }

            $(e.target).closest('.action-button-block').find('p').html(resultMessage);
        });
    }

    return `
        <div class="action-button-block">
            <button
                type="button"
                class="btn btn-block ${params.ButtonClass}"
                id="${params.Id}"
            >
                ${params.Text}
            </button>
            <br/>
            <p></p>
        </div>
    `;
}
