import Base from './../../Base';

import './Profile.less';

export default class Profile extends Base {
    async initUnits() {
        const { Button, Headline, Input, Caption } = this.components;

        const teacher = await this.api.teachers.show(this.params.teacherId);

        this.units.headline = new Headline({ text : 'ПРОФІЛЬ КОРИСТУВАЧА' });

        this.units.successSaveCaption = new Caption({
            text : 'ЗБЕРЕЖЕНО'
        });

        this.units.lastNameInput = new Input({
            title : 'Прізвище',
            value : teacher.lastName
        });

        this.units.firstNameInput = new Input({
            title : 'Ім’я',
            value : teacher.firstName
        });

        this.units.middleNameInput = new Input({
            title : 'По батькові',
            value : teacher.middleName
        });

        this.units.emailInput = new Input({
            title : 'Електронна пошта',
            type  : 'email',
            value : teacher.email
        });

        this.units.newPasswordInput = new Input({
            title       : 'Новий пароль',
            type        : 'password',
            placeholder : 'Залиште без змін, якщо не бажаєте змінювати пароль'
        });

        this.units.newPasswordRepeatInput = new Input({
            title       : 'Повторіть новий пароль',
            type        : 'password',
            placeholder : 'Залиште без змін, якщо не бажаєте змінювати пароль'
        });

        this.units.passwordInput = new Input({
            title       : 'Для збереження змін введіть поточний пароль',
            type        : 'password'
        });

        this.units.submitButton = new Button({
            text  : 'ЗБЕРЕГТИ',
            color : 'blue',
            action : async () => {
                await this.updateProfile();
            }
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="Profile page">
                ${await this.units.headline.html()}

                <div class="success-block">
                    ${await this.units.successSaveCaption.html()}
                </div>

                <div class="name-block">
                    ${await this.units.lastNameInput.html()}
                    ${await this.units.firstNameInput.html()}
                    ${await this.units.middleNameInput.html()}
                </div>

                <div class="email-block">
                    ${await this.units.emailInput.html()}
                </div>

                <div class="new-password-block">
                    ${await this.units.newPasswordInput.html()}
                    ${await this.units.newPasswordRepeatInput.html()}
                </div>

                <div class="confirm-password-block">
                    ${await this.units.passwordInput.html()}
                </div>

                <div class="bottom-block">
                    ${await this.units.submitButton.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }

    async updateProfile() {
        $('.success-block').removeClass('active');

        const params = {
            firstName  : this.units.firstNameInput.getValue(),
            lastName   : this.units.lastNameInput.getValue(),
            middleName : this.units.middleNameInput.getValue(),
            email      : this.units.emailInput.getValue(),
            password   : this.units.passwordInput.getValue()
        };

        if (this.units.newPasswordInput.getValue() || this.units.newPasswordRepeatInput.getValue()) {
            params.newPassword = this.units.newPasswordInput.getValue();
            params.newPasswordRepeat = this.units.newPasswordRepeatInput.getValue();
        }

        const response = await this.api.teachers.update(this.params.teacherId, params);

        const errorFields = response.error && response.error.fields ? response.error.fields : {};

        this.units.firstNameInput.toggleError(errorFields.firstName);
        this.units.lastNameInput.toggleError(errorFields.lastName);
        this.units.middleNameInput.toggleError(errorFields.middleName);
        this.units.emailInput.toggleError(errorFields.email);
        this.units.passwordInput.toggleError(errorFields.password);
        this.units.newPasswordInput.toggleError(errorFields.newPassword);
        this.units.newPasswordRepeatInput.toggleError(errorFields.newPasswordRepeat);

        if (response.status) {
            $('.success-block').addClass('active');
            setTimeout(() => ($(window).scrollTop(0)), 300);
        }
    }
}
