import Base from './../Base';

import './DefaultSidebar.less';

export default class DefaultSidebar extends Base {
    async html() {
        return `
            <div class="DefaultSidebar sidebar">
                <img src="/static/images/nuft-logo.png">
            </div>
        `;
    }
}
