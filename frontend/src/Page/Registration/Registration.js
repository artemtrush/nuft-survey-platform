import Base from './../Base';

import './Registration.less';

export default class Registration extends Base {
    async initUnits() {
        const { Button, Headline, Caption, Input } = this.components;

        this.units.headline = new Headline({ text : 'РЕЄСТРАЦІЯ' });

        this.units.emailInput = new Input({
            title : 'Електронна пошта',
            type  : 'email'
        });

        this.units.passwordInput = new Input({
            title : 'Пароль',
            type  : 'password'
        });

        this.units.passwordRepeatInput = new Input({
            title : 'Повторіть пароль',
            type  : 'password'
        });

        this.units.submitButton = new Button({
            text  : 'ЗАРЕЄСТРУВАТИСЬ',
            color : 'blue',
            action : () => {

            }
        });

        this.units.caption1 = new Caption({ text : 'або якщо Ви вже зареєстровані' });

        this.units.authorizationButton = new Button({
            text   : 'ВХІД',
            color  : 'white-green',
            action : () => {
                this.utils.redirect('authorization');
            }
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="Registration page">
                ${await this.units.headline.html()}

                <div class="inputs-block">
                    ${await this.units.emailInput.html()}
                    ${await this.units.passwordInput.html()}
                    ${await this.units.passwordRepeatInput.html()}
                    ${await this.units.submitButton.html()}
                </div>

                <div class="bottom-block">
                    ${await this.units.caption1.html()}
                    ${await this.units.authorizationButton.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
