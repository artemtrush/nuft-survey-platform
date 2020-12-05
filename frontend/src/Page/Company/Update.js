import Base from "./Base";

export default class Update extends Base {
    async init()    {
        this.component.Tinymce.init('description');

        const facts = this.Company.Facts ? this.Company.Facts : [];
        Object.values(facts).forEach(fact => {
            this.insertFactRow(fact);
        });

        const documents = this.Company.Documents ? this.Company.Documents : [];
        Object.values(documents).forEach(doc => {
            this.insertDocumentRow(doc);
        });
    }

    async bindEvents() {
        const $form = $('form#company_update');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.updateCompany();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('company_index'));
        });
    }

    header() {
        return 'Редактирование МФО';
    }

    content() {
        return `
            <form id="company_update">
                ${this.getCompanyForm(this.Company)}
            </form>
        `;
    }

    async updateCompany() {
        const params = this.getCompanyFormParams();
        const formData = this.form.convertParamsToFormData(params);
        const response = await this.api.company.update(this.Company.Id, formData);

        if (response.Status) {
            this.reload();
        } else {
            const formSelector = '#company_update';
            const errorsFields = this.getCompanyFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
