import Base from './../Base';

import './HorizontalLine.less';

export default class HorizontalLine extends Base {
    async html() {
        return `
            <div class="HorizontalLine">
                <span>
                    <div class="first-circle"></div>
                    <div class="second-circle"></div>
                    <div class="third-circle"></div>
                </span>
            </div>
        `;
    }
}
