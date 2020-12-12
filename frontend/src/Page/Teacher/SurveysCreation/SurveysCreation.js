import Base from './../../Base';

import './SurveysCreation.less';

export default class SurveysCreation extends Base {
    async initUnits() {
        const { Headline, Button, PeriodSelect, CurriculumInput, DisciplineInput, GroupInput } = this.components;

        this.units.headline = new Headline({ text : 'СВОРЕННЯ ОПИТУВАННЯ' });

        this.units.creationButton = new Button({
            text   : 'СТВОРИТИ',
            color  : 'blue',
            action : async () => {
                await this.creation();
            }
        });

        this.units.backToListButton = new Button({
            text   : 'ПОВЕРНУТИСЬ ДО ОПИТУВАНЬ',
            color  : 'white-green',
            action : async () => {
                this.utils.redirect('teacher_surveys');
            }
        });

        this.units.groupInput = new GroupInput();

        this.units.disciplineInput = new DisciplineInput();

        this.units.curriculumInput = new CurriculumInput({
            onChange: () => {
                this.units.disciplineInput.setСurriculumId(this.units.curriculumInput.getСurriculumId());
                this.units.groupInput.setСurriculumId(this.units.curriculumInput.getСurriculumId());
            }
        });

        this.units.periodSelect = new PeriodSelect({
            onChange: () => this.units.curriculumInput.setPeriod(this.units.periodSelect.getPeriod())
        });
    }

    async html() {
        await this.initUnits();

        return `
            <div class="SurveysCreation page">
                ${await this.units.headline.html()}

                ${await this.units.periodSelect.html()}
                ${await this.units.curriculumInput.html()}
                ${await this.units.disciplineInput.html()}
                ${await this.units.groupInput.html()}

                ${await this.units.creationButton.html()}
                ${await this.units.backToListButton.html()}
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();

        this.units.curriculumInput.setPeriod(this.units.periodSelect.getPeriod());
    }

    async creation() {

    }
}
