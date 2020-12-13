import Base from './../Base';

import './Button.less';

export default class Button extends Base {
    defaultParams() {
        return {
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
        const { action, width, height } = this.params;

        const $button = this.getElement();

        $button.css('width', width);
        $button.css('height', height);

        if (action) {
            $button.click(async () => {
                if ($button.hasClass('disabled')) {
                    return;
                }

                $button.addClass('disabled');

                await action();

                $button.removeClass('disabled');
            });
        }
    }
}
