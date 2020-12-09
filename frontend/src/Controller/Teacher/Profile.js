import Base from './Base';

export default class Profile extends Base {
    async renderContent() {
        const { TeacherProfile: ProfilePage } = this.pages;

        const teacherId = this.session.getTeacherId();

        return new ProfilePage({ teacherId, ...this.params });
    }
}
