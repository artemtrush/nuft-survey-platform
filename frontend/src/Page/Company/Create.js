import Base from "./Base";

export default class Create extends Base {
    async init()    {
        this.component.Tinymce.init('description');
    }

    async bindEvents() {
        const $form = $('form#company_create');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.createCompany();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('company_index'));
        });
    }

    header() {
        return `Новая МФО`;
    }

    content() {
        return `
            <form id="company_create">
                ${this.getCompanyForm()}
            </form>
        `;
    }

    async createCompany() {
        const params = this.getCompanyFormParams();
        const formData = this.form.convertParamsToFormData(params);
        const response = await this.api.company.create(formData);

        if (response.Status) {
            this.redirect(this.pathFor('company_index'));
        } else {
            const formSelector = '#company_create';
            const errorsFields = this.getCompanyFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
