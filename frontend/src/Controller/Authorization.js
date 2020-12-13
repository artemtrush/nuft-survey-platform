import Base from './Base';

export default class Authorization extends Base {
    async validate() {
        if (this.session.isAuthorizedTeacher()) {
            this.utils.redirect('teacher_surveys');
        }
    }

    async renderContent() {
        const { Authorization: AuthorizationPage } = this.pages;

        return new AuthorizationPage(this.params);
    }
}
