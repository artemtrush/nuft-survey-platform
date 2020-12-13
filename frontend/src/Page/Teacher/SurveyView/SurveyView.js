import Base from './../../Base';

import './SurveyView.less';

export default class SurveyView extends Base {
    async initUnits() {
        const { Headline, Button, Caption } = this.components;

        const surveyId = this.params.id;
        const response = await this.api.surveys.show(surveyId);

        const survey = response.survey || {};
        const surveyLink = survey.link || '';

        this.units.headline = new Headline({ text : 'ОПИТУВАННЯ СТВОРЕНО' });

        this.units.caption1 = new Caption({
            text  : 'Ваше опитування було успішно створенно!',
            size  : 'middle',
            align : 'left'
        });

        this.units.caption2 = new Caption({
            text  : surveyLink,
            align : 'left'
        });

        this.units.backToListButton = new Button({
            text   : 'ПОВЕРНУТИСЬ ДО ОПИТУВАНЬ',
            color  : 'white-green',
            action : async () => {
                this.utils.redirect('teacher_surveys');
            }
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="SurveyView page">
                ${await this.units.headline.html()}

                <div class="success-block">
                    ${await this.units.caption1.html()}
                </div>

                <div class="link-block">
                    ${await this.units.caption2.html()}
                </div>

                <div class="return-block">
                    ${await this.units.backToListButton.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
