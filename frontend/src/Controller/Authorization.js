import Base from './Base';

export default class Authorization extends Base {
    async renderContent() {
        const { Authorization: AuthorizationPage } = this.pages;

        return new AuthorizationPage(this.params);
    }
}
