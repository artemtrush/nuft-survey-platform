import Base from '../Modal';

export default class Delete extends Base {
    confirmCallback() {
    }

    closeCallback() {
    }

    getDeletedEntityName() {
        return '';
    }

    init() {
        $('#deleteModal').modal().on('hidden.bs.modal', () => {
            this.closeCallback();
        });

        $('#deleteModal #confirm').on('click', e => {
            e.preventDefault();
            this.confirmCallback();
        });
    }

    header() {
        return 'Удаление';
    }

    content() {
        return `
            <div class="modal" id="deleteModal" role="dialog" arial-labelledby="deleteModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="delete-modal-form">
                            <div id="form_error" class="form-group">
                                <span class="help-block"></span>
                            </div>
                            <p>Вы действительно хотите удалить ${_.escape(this.getDeletedEntityName())} ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-danger" id="confirm">
                                Удалить
                            </button>
                            <button type="submit" class="btn btn-primary" id="cancel" data-dismiss="modal">
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async treatDeleteResponse(response) {
        if (response.Status) {
            $('#deleteModal').modal('hide');
        } else {
            const formSelector = '#delete-modal-form';
            await this.validator.showFormError(formSelector, response);
        }
    }
}
