import Base from "./Base";

export default class Update extends Base {
    async init()    {
        this.component.Tinymce.init('description');

        const facts = this.Commissioner.Facts ? this.Commissioner.Facts : [];
        Object.values(facts).forEach(fact => {
            this.insertFactRow(fact);
        });

        const documents = this.Commissioner.Documents ? this.Commissioner.Documents : [];
        Object.values(documents).forEach(doc => {
            this.insertDocumentRow(doc);
        });
    }

    async bindEvents() {
        const $form = $('form#commissioner_update');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.updateCommissioner();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('commissioner_index'));
        });
    }

    header() {
        return 'Редактирование комиссионера';
    }

    content() {
        return `
            <form id="commissioner_update">
                ${this.getCommissionerForm(this.Commissioner)}
            </form>
        `;
    }

    async updateCommissioner() {
        const params = this.getCommissionerFormParams();
        const formData = this.form.convertParamsToFormData(params);
        const response = await this.api.commissioner.update(this.Commissioner.Id, formData);

        if (response.Status) {
            this.reload();
        } else {
            const formSelector = '#commissioner_update';
            const errorsFields = this.getCommissionerFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
