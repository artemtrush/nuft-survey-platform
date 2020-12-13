import Base from './../../Base';

import './SurveyCreation.less';

export default class SurveyCreation extends Base {
    async initUnits() {
        const {
            Headline, Button, Caption,
            PeriodSelect, CurriculumInput, DisciplineInput, GroupInput
        } = this.components;

        this.units.headline = new Headline({ text : 'СВОРЕННЯ ОПИТУВАННЯ' });

        const response = await this.api.teachers.show(this.params.teacherId);
        const teacher = response.teacher;

        if (!teacher.firstName || !teacher.lastName || !teacher.middleName) {
            this.units.emptyProfileCaption = new Caption({
                text  : 'Перед створенням опитувань необхідно заповнити профіль!',
                size  : 'middle',
                align : 'left'
            });

            return;
        }

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
                this.units.disciplineInput.setСurriculumName(this.units.curriculumInput.getСurriculumName());

                this.units.groupInput.setСurriculumId(this.units.curriculumInput.getСurriculumId());
                this.units.groupInput.setСurriculumName(this.units.curriculumInput.getСurriculumName());
            }
        });

        this.units.periodSelect = new PeriodSelect({
            onChange: () => this.units.curriculumInput.setPeriod(this.units.periodSelect.getPeriod())
        });
    }

    async html() {
        await this.initUnits();

        if (this.units.emptyProfileCaption) {
            return `
                <div class="SurveyCreation page">
                    ${await this.units.headline.html()}

                    <div class="empty-profile-block">
                        ${await this.units.emptyProfileCaption.html()}
                    </div>
                </div>
            `;
        }

        return `
            <div class="SurveyCreation page">
                ${await this.units.headline.html()}

                <div class="inputs-block">
                    ${await this.units.periodSelect.html()}
                    ${await this.units.curriculumInput.html()}
                    ${await this.units.disciplineInput.html()}
                    ${await this.units.groupInput.html()}
                </div>

                <div class="create-block">
                    ${await this.units.creationButton.html()}
                </div>

                <div class="return-block">
                    ${await this.units.backToListButton.html()}
                </div>
            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();

        if (this.units.emptyProfileCaption) {
            return;
        }

        this.units.curriculumInput.setPeriod(this.units.periodSelect.getPeriod());
        this.units.curriculumInput.clear();
    }

    async creation() {
        this.units.curriculumInput.hideError();
        this.units.disciplineInput.hideError();
        this.units.groupInput.hideError();

        let curriculumId = this.units.curriculumInput.getСurriculumId();

        if (!curriculumId) {
            const response = await this.api.curriculums.create({
                name   : this.units.curriculumInput.getСurriculumName(),
                period : this.units.curriculumInput.getPeriod()
            });

            if (response.status) {
                curriculumId = response.curriculum.id;

                this.units.curriculumInput.setСurriculumId(curriculumId);
                this.units.disciplineInput.setСurriculumId(curriculumId);
                this.units.groupInput.setСurriculumId(curriculumId);
            } else {
                const errorFields = response.error && response.error.fields ? response.error.fields : {};
                this.units.curriculumInput.toggleError(errorFields.name);
                return;
            }
        }

        let disciplineId = this.units.disciplineInput.getDisciplineId();

        if (!disciplineId) {
            const response = await this.api.disciplines.create({
                name : this.units.disciplineInput.getDisciplineName(),
                curriculumId
            });

            if (response.status) {
                disciplineId = response.discipline.id;

                this.units.disciplineInput.setDisciplineId(disciplineId);
            } else {
                const errorFields = response.error && response.error.fields ? response.error.fields : {};
                this.units.disciplineInput.toggleError(errorFields.name);
                return;
            }
        }

        let groupId = this.units.groupInput.getGroupId();

        if (!groupId) {
            const response = await this.api.groups.create({
                name : this.units.groupInput.getGroupName(),
                curriculumId
            });

            if (response.status) {
                groupId = response.group.id;

                this.units.groupInput.setGroupId(groupId);
            } else {
                const errorFields = response.error && response.error.fields ? response.error.fields : {};
                this.units.groupInput.toggleError(errorFields.name);
                return;
            }
        }

        const response = await this.api.surveys.create({
            curriculumId,
            disciplineId,
            groupId
        });

        if (response.status) {
            const surveyId = response.survey.id;

            this.utils.redirect('teacher_survey_view', { id: surveyId });
        }
    }
}
