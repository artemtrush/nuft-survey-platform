import Base from './../Base';

import './Input.less';

export default class Input extends Base {
    defaultParams() {
        return {
            id          : this.uuid(),
            title       : '',
            placeholder : '',
            value       : '',

            type        : 'text' // text | email | password
        };
    }

    async html() {
        const { id, title, type, placeholder, value } = this.params;

        return `
            <div id="${id}" class="Input ${type}">
                <span class="input-title">${title}</span>
                <input type="${type}" placeholder="${placeholder}" value="${value}"/>

                <div class="password-toggle-button"></div>
            </div>
        `;
    }

    async events() {
        const { id, type } = this.params;

        const $inputBlock = $(`#${id}`);
        const $input = $('input', $inputBlock);

        if (type === 'password') {
            const $passwordToggleButton = $('.password-toggle-button', $inputBlock);

            $passwordToggleButton.click(() => {
                if ($passwordToggleButton.hasClass('visible')) {
                    $input.attr('type', 'password');
                    $passwordToggleButton.removeClass('visible');
                } else {
                    $input.attr('type', 'text');
                    $passwordToggleButton.addClass('visible');
                }
            });
        }
    }
}
