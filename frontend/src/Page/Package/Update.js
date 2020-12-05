import Base from "./Base";

export default class Update extends Base {
    async init()    {
        Object.values(this.Package.Terms).forEach(term => {
            this.insertTermRow(term);
        });
    }

    async bindEvents() {
        const $form = $('form#package_update');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.updatePackage();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('package_index'));
        });
    }

    header() {
        return 'Редактирование пакета';
    }

    content() {
        return `
            <form id="package_update">
                ${this.getPackageForm(this.Package)}
            </form>
        `;
    }

    async updatePackage() {
        const params = this.getPackageFormParams();
        const response = await this.api.package.update(this.Package.Id, params);

        if (response.Status) {
            this.reload();
        } else {
            const formSelector = '#package_update';
            const errorsFields = this.getPackageFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
