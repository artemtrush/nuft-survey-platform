import Base from './../Base';

import './Caption.less';

export default class Caption extends Base {
    defaultParams() {
        return {
            text    : '',

            align   : 'center', // center | left | right
            size    : 'normal' // normal | medium | large
        };
    }

    async html() {
        const { id, text, size, align } = this.params;

        return `
            <div id="${id}" class="Caption ${size} ${align}">
                <span>${text}</span>
            </div>
        `;
    }
}
