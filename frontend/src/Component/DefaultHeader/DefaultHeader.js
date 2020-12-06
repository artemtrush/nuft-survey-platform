import Base from './../Base';

import './DefaultHeader.less';

export default class DefaultHeader extends Base {
    async html() {
        const { HorizontalLine } = this.components;

        this.line = new HorizontalLine();

        return `
            <div class="DefaultHeader header">
                ${await this.line.html()}
            </div>
        `;
    }

    async events() {
        await this.line.events();
    }
}
