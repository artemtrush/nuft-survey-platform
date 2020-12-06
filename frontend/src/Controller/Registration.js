import Base from './Base';

export default class Registration extends Base {
    async renderContent() {
        const { Registration: RegistrationPage } = this.pages;

        return new RegistrationPage(this.params);
    }
}
