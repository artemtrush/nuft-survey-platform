import Modal from "../Modal";

export default class Error extends Modal {
    constructor(text) {
        super();

        this.Text = text;
    }

    async init() {
        $('#errorModal')
            .modal()
            .on('hidden.bs.modal', function () {
                $('#modals').empty();
                history.back();
            });
    }

    content() {
        return `
            <div class="modal" id="errorModal" role="dialog" arial-labelledby="deleteModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ошибка</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="form_error" class="form-group">
                                <span class="help-block"></span>
                            </div>
                            <p>${ _.escape(this.Text) }</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" id="cancel" data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
