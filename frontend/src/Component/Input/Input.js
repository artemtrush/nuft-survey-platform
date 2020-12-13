import Base from './../Base';

import './Input.less';

export default class Input extends Base {
    defaultParams() {
        return {
            title       : '',
            placeholder : '',
            value       : '',

            type        : 'text', // text | email | password

            onChange    : () => {}
        };
    }

    async html() {
        const { id, title, type, placeholder, value } = this.params;

        return `
            <div id="${id}" class="Input ${type}">
                <span class="input-title">${title}</span>
                <input type="${type}" placeholder="${placeholder}" value="${value || ''}"/>

                <div class="password-toggle-button"></div>
                <div class="error-message"></div>
            </div>
        `;
    }

    async events() {
        const { type, onChange } = this.params;

        const $inputBlock = this.getElement();
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

        $input.on('change', onChange);
    }

    getValue() {
        const $input = $('input', this.getElement());

        const inputText = $input.val() || '';

        return inputText.trim();
    }

    setValue(value) {
        const $input = $('input', this.getElement());

        $input.val((value || '').trim());

        $input.trigger('change');
    }

    showError(errorMessage) {
        const $inputBlock = this.getElement();

        $inputBlock.addClass('error');

        $('.error-message', $inputBlock).text(errorMessage);
    }

    hideError() {
        const $inputBlock = this.getElement();

        $inputBlock.removeClass('error');

        $('.error-message', $inputBlock).text('');
    }

    toggleError(errorMessages) {
        if (errorMessages && errorMessages.length) {
            this.showError(errorMessages[0]);
        } else {
            this.hideError();
        }
    }

    disable() {
        const $inputBlock = this.getElement();
        const $input = $('input', $inputBlock);

        $inputBlock.addClass('disabled');
        $input.prop('disabled', true);
    }

    enable() {
        const $inputBlock = this.getElement();
        const $input = $('input', $inputBlock);

        $inputBlock.removeClass('disabled');
        $input.prop('disabled', false);
    }

    clear() {
        this.setValue('');
    }
}
