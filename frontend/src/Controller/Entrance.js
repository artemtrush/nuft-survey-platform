import Base from './Base';

export default class Entrance extends Base {
    async renderContent() {
        const { Entrance: EntrancePage } = this.pages;

        return new EntrancePage(this.params);
    }
}
