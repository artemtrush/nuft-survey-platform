import Base from './Base';

export default class Surveys extends Base {
    async renderContent() {
        const { TeacherSurveys: SurveysPage } = this.pages;

        const teacherId = this.session.getTeacherId();

        return new SurveysPage({ teacherId, ...this.params });
    }
}
