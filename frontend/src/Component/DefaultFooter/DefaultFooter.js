import Base from './../Base';

import './DefaultFooter.less';

export default class DefaultFooter extends Base {
    async html() {
        const { HorizontalLine } = this.components;

        this.line = new HorizontalLine();

        return `
            <div class="DefaultFooter footer">
                ${await this.line.html()}
            </div>
        `;
    }

    async events() {
        await this.line.events();
    }
}
