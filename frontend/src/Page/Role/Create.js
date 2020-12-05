import Base from "./Base";

export default class Create extends Base {
    async init() {
        this.initPermissionsList();
        this.initPermittedCompaniesList();
    }

    async bindEvents() {
        $('form#role_create').on('submit', e => {
            e.preventDefault();
            this.createRole();
        });
        $('form#role_create').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('role_index'));
        });
    }

    header() {
        return `Новая роль`;
    }

    content() {
        return `
            <form id="role_create">
                ${this.getRoleForm()}
            </form>
        `;
    }

    async createRole() {
        const params = this.getRoleFormParams();
        const response = await this.api.role.create(params);

        if (response.Status) {
            this.redirect(this.pathFor('role_index'));
        } else {
            const formSelector = '#role_create';
            const errorsFields = this.getRoleFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
