import Base from './../Base';

import './Button.less';

export default class Button extends Base {
    defaultParams() {
        return {
            id      : this.uuid(),
            text    : '',
            action  : () => {},

            width   : '100%',
            height  : '60px',

            color   : 'green' // green | blue | white-green | white-blue
        };
    }

    async html() {
        const { id, text, color } = this.params;

        return `
            <div id="${id}" class="Button ${color}">
                <span>${text}</span>
            </div>
        `;
    }

    async events() {
        const { id, action, width, height } = this.params;

        const $button = $(`#${id}`);

        $button.click(action);

        $button.css('width', width);
        $button.css('height', height);
    }
}
