/* eslint-disable func-style */

import api          from './../apiSingleton.js';
import components   from './../Component';
import pages        from './../Page';

export default class Base {
    constructor() {
        this.api = api;
        this.components = components;
        this.pages = pages;
    }

    async init(params = {}) {
        this.params = params;

        await this.validate();
        await this.render();
        await this.specificEvents();
    }

    async validate() {

    }

    async render() {
        const mountComponent = async (componentId, componentRenderer) => {
            const component = await componentRenderer.call(this);

            if (component) {
                $(`#${componentId}`).html(await component.html());
                await component.events();
            } else {
                $(`#${componentId}`).empty();
            }
        };

        return Promise.all([
            mountComponent('sidebar', this.renderSidebar),
            mountComponent('header', this.renderHeader),
            mountComponent('content', this.renderContent),
            mountComponent('footer', this.renderFooter)
        ]);
    }

    async renderSidebar() {
        const { DefaultSidebar } = this.components;

        return new DefaultSidebar();
    }

    async renderContent() {

    }

    async renderHeader() {
        const { DefaultHeader } = this.components;

        return new DefaultHeader();
    }

    async renderFooter() {
        const { DefaultFooter } = this.components;

        return new DefaultFooter();
    }

    async specificEvents() {
        const alignSidebar = () => {
            const sidebarWidth = $('#sidebar').width();
            $('#container').css('margin-left', sidebarWidth);
        };

        $(window).off('resize').on('resize', alignSidebar);
        alignSidebar();
    }
}
