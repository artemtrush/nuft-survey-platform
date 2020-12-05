import Base from "./Base";

export default class Update extends Base {
    async init() {
        this.initRolesList(this.User.Roles);
    }

    async bindEvents() {
        $('form#users_update').on('submit', e => {
            e.preventDefault();
            this.updateUser();
        });

        $('form#users_update').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('user_index'));
        });
    }

    header() {
        return 'Редактирование пользователя';
    }

    content() {
        return `
            <form id="users_update">
                ${this.getUserForm(this.User)}
            </form>
        `;
    }

    async updateUser() {

        const params = this.getUserFormParams();
        const response = await this.api.user.update(this.User.Id, params);

        if (response.Status) {
            await this.page.loadStates();
            this.reload();
        } else {
            const formSelector = '#users_update';
            const errorsFields = this.getUserFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
