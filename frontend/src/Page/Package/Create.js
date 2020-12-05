import Base from "./Base";

export default class Create extends Base {
    async init()    {
        this.insertTermRow();
    }

    async bindEvents() {
        const $form = $('form#package_create');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.createPackage();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('package_index'));
        });
    }

    header() {
        return `Новый пакет`;
    }

    content() {
        return `
            <form id="package_create">
                ${this.getPackageForm()}
            </form>
        `;
    }

    async createPackage() {
        const params = this.getPackageFormParams();
        const response = await this.api.package.create(params);

        if (response.Status) {
            this.redirect(this.pathFor('package_index'));
        } else {
            const formSelector = '#package_create';
            const errorsFields = this.getPackageFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
