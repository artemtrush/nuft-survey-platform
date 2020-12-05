import Base from "../../Base";

export default class Update extends Base {
    async bindEvents() {
        $('form#user_profile_update').on('submit', e => {
            e.preventDefault();
            this.updateUserProfile();
        });

        $('form#user_profile_update').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('index'));
        });
    }

    header() {
        return 'Редактирование профиля';
    }

    content() {
        return `
            <form id="user_profile_update">
                ${this.getUserProfileForm(this.User)}
            </form>
        `;
    }

    async updateUserProfile() {

        const params = this.getUserProfileFormParams();
        const response = await this.api.userProfile.update(params);

        if (response.Status) {
            window.location.reload();
        } else {
            const formSelector = '#user_profile_update';
            const errorsFields = this.getUserProfileFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }

    getUserProfileForm(user)    {
        return `
            ${this.component.FormErrorBlock()}
            ${this.component.Input({
                Id: 'email',
                Text: 'E-mail',
                Type: 'email',
                Value: user.Email
            })}
            ${this.component.Input({
                Id: 'password',
                Text: 'Пароль',
                Type: 'password'
            })}
            ${this.component.Input({
                Id: 'confirm_password',
                Text: 'Подтвердить пароль',
                Type: 'password'
            })}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getUserProfileFormParams()    {
        const params = {
            Email: $('#email').val(),
            Password: $('#password').val(),
            ConfirmPassword: $('#confirm_password').val()
        };

        return params;
    }

    getUserProfileFormErrorFields()    {
        const errorsFields = {
            Email: 'email',
            Password: 'password',
            ConfirmPassword: 'confirm_password'
        };

        return errorsFields;
    }
}
