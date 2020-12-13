import Base from './Base';

export default class Entrance extends Base {
    async validate() {
        if (this.session.isAuthorizedTeacher()) {
            this.utils.redirect('teacher_surveys');
        }
    }

    async renderContent() {
        const { Entrance: EntrancePage } = this.pages;

        return new EntrancePage(this.params);
    }
}
