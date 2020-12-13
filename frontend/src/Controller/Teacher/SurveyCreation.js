import Base from './Base';

export default class SurveyCreation extends Base {
    async renderContent() {
        const { TeacherSurveyCreation: SurveyCreationPage } = this.pages;

        const teacherId = this.session.getTeacherId();

        return new SurveyCreationPage({ teacherId, ...this.params });
    }
}
