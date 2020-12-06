import Base from './../Base';

import './Authorization.less';

export default class Authorization extends Base {
    async initUnits() {
        const { Button, Headline, Caption, Input } = this.components;

        this.units.headline = new Headline({ text : 'ВХІД' });

        this.units.emailInput = new Input({
            title : 'Електронна пошта',
            type  : 'email'
        });

        this.units.passwordInput = new Input({
            title : 'Пароль',
            type  : 'password'
        });

        this.units.submitButton = new Button({
            text  : 'ВХІД',
            color : 'green',
            action : () => {

            }
        });

        this.units.caption1 = new Caption({ text : 'або якщо Ви НЕ зареєстровані' });

        this.units.registrationButton = new Button({
            text   : 'ЗАРЕЄСТРУВАТИСЬ',
            color  : 'white-blue',
            action : () => {
                this.utils.redirect('registration');
            }
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="Authorization page">
                ${await this.units.headline.html()}

                <div class="inputs-block">
                    ${await this.units.emailInput.html()}
                    ${await this.units.passwordInput.html()}
                    ${await this.units.submitButton.html()}
                </div>

                <div class="bottom-block">
                    ${await this.units.caption1.html()}
                    ${await this.units.registrationButton.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
