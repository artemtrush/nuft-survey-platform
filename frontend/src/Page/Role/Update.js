import Base from "./Base";

export default class Update extends Base {
    async init() {
        this.initPermissionsList(this.Role.Permissions);
        this.initPermittedCompaniesList(this.Role.PermittedCompanies);
    }

    async bindEvents() {
        $('form#roles_update').on('submit', e => {
            e.preventDefault();
            this.updateRole();
        });

        $('form#roles_update').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('role_index'));
        });
    }

    header() {
        return 'Редактирование роли';
    }

    content() {
        return `
            <form id="roles_update">
                ${this.getRoleForm(this.Role)}
            </form>
        `;
    }

    async updateRole() {
        const params = this.getRoleFormParams();
        const response = await this.api.role.update(this.Role.Id, params);

        if (response.Status) {
            await this.page.loadStates();
            this.reload();
        } else {
            const formSelector = '#roles_update';
            const errorsFields = this.getRoleFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
