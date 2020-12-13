import Base from './Base';

export default class SurveyView extends Base {
    async renderContent() {
        const { TeacherSurveyView: SurveyViewPage } = this.pages;

        const teacherId = this.session.getTeacherId();

        return new SurveyViewPage({ teacherId, ...this.params });
    }
}
