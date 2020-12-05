import Base from "./Base";

export default class Create extends Base {
    async init()    {
        this.component.Tinymce.init('description');
    }

    async bindEvents() {
        const $form = $('form#commissioner_create');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.createCommissioner();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('commissioner_index'));
        });
    }

    header() {
        return `Новый комиссионер`;
    }

    content() {
        return `
            <form id="commissioner_create">
                ${this.getCommissionerForm()}
            </form>
        `;
    }

    async createCommissioner() {
        const params = this.getCommissionerFormParams();
        const formData = this.form.convertParamsToFormData(params);
        const response = await this.api.commissioner.create(formData);

        if (response.Status) {
            this.redirect(this.pathFor('commissioner_index'));
        } else {
            const formSelector = '#commissioner_create';
            const errorsFields = this.getCommissionerFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
