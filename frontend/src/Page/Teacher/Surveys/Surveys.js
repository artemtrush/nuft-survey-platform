import Base from './../../Base';

import './Surveys.less';

export default class Surveys extends Base {
    async initUnits() {
        const { Headline, Caption, Button } = this.components;

        this.units.headline = new Headline({ text : 'ОПИТУВАННЯ' });

        this.units.creationButton = new Button({
            text   : 'СТВОРИТИ',
            color  : 'blue',
            action : () => {
                this.utils.redirect('teacher_survey_creation');
            }
        });

        this.units.inProgressCaption = new Caption({ text : 'Даний розділ знаходиться в розробці...' });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="Surveys page">
                <div class="surveys-head">
                    ${await this.units.headline.html()}
                    ${await this.units.creationButton.html()}
                </div>

                <div class="in-progress-block">
                    ${await this.units.inProgressCaption.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
