import Base from './Base';

export default class Registration extends Base {
    async validate() {
        if (this.session.isAuthorizedTeacher()) {
            this.utils.redirect('teacher_surveys');
        }
    }

    async renderContent() {
        const { Registration: RegistrationPage } = this.pages;

        return new RegistrationPage(this.params);
    }
}
