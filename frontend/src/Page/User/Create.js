import Base from "./Base";

export default class Create extends Base {
    async init() {
        this.initRolesList();
    }

    async bindEvents() {
        $('form#users_create').on('submit', e => {
            e.preventDefault();
            this.createUser();
        });
        $('form#users_create').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('user_index'));
        });
    }

    header() {
        return `Новый пользователь`;
    }

    content() {
        return `
            <form id="users_create">
                ${this.getUserForm()}
            </form>
        `;
    }

    async createUser() {
        const params = this.getUserFormParams();
        const response = await this.api.user.create(params);

        if (response.Status) {
            this.redirect(this.pathFor('user_index'));
        } else {
            const formSelector = '#users_create';
            const errorsFields = this.getUserFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
