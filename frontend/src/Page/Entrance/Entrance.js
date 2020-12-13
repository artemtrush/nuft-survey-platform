import Base from './../Base';

import './Entrance.less';

export default class Entrance extends Base {
    async initUnits() {
        const { Button, Caption } = this.components;

        this.units.caption1 = new Caption({ text : 'НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ', size : 'middle' });
        this.units.caption2 = new Caption({ text : 'ХАРЧОВИХ ТЕХНОЛОГІЙ', size : 'middle' });

        this.units.caption3 = new Caption({ text : 'МОДУЛЬ', size : 'large' });
        this.units.caption4 = new Caption({ text : 'ОПИТУВАННЯ', size : 'large' });

        this.units.caption5 = new Caption({ text : 'або' });

        this.units.caption6 = new Caption({ text : 'КИЇВ 2020' });

        this.units.registrationButton = new Button({
            text   : 'РЕЄСТРАЦІЯ',
            color  : 'blue',
            action : () => {
                this.utils.redirect('registration');
            }
        });

        this.units.authorizationButton = new Button({
            text   : 'ВХІД',
            color  : 'green',
            action : () => {
                this.utils.redirect('authorization');
            }
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="Entrance page">
                <div class="top-caption-block">
                    ${await this.units.caption1.html()}
                    ${await this.units.caption2.html()}
                </div>

                <div class="center-caption-block">
                    ${await this.units.caption3.html()}
                    ${await this.units.caption4.html()}
                </div>

                <div class="buttons-block">
                    ${await this.units.registrationButton.html()}
                    ${await this.units.caption5.html()}
                    ${await this.units.authorizationButton.html()}
                </div>

                ${await this.units.caption6.html()}
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
