import api          from './../apiSingleton.js';
import components   from './../Component';

export default class Base {
    constructor() {
        this.api = api;
        this.components = components;
    }

    async init(params) {
        await this.render();
    }

    async render() {
        return Promise.all([
            this.renderSidebar(),
            this.renderContent(),
            this.renderHeader(),
            this.renderFooter()
        ]);
    }

    async renderSidebar() {
        const { DefaultSidebar } = this.components;

        console.log(this.components);
    }

    async renderContent() {

    }

    async renderHeader() {

    }

    async renderFooter() {

    }
}
