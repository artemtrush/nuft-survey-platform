import Base from './Base';

export default class SurveysCreation extends Base {
    async renderContent() {
        const { TeacherSurveysCreation: SurveysCreationPage } = this.pages;

        const teacherId = this.session.getTeacherId();

        return new SurveysCreationPage({ teacherId, ...this.params });
    }
}
