import Base from './../Base';

import './Select.less';

export default class Select extends Base {
    defaultParams() {
        return {
            title         : '',
            selectedValue : null,
            dataLoader    : () => {
                return [];
            },
            onChange      : () => {}
        };
    }

    async html() {
        const { id, title, selectedValue } = this.params;

        const data = await this.params.dataLoader();
        const options = [];

        for (const option of data || []) {
            const selected = (selectedValue === option.value) ? 'selected="selected"' : '';

            options.push(
                `<option value="${option.value}" ${selected}>${option.text}</option>`
            );
        }

        return `
            <div id="${id}" class="Select">
                <span class="select-title">${title}</span>
                <select>
                    ${options.join('')}
                </select>

                <div class="error-message"></div>
            </div>
        `;
    }

    async events() {
        const { onChange } = this.params;

        const $select = $('select', this.getElement());

        $select.on('change', onChange);
    }

    getValue() {
        const $select = $('select', this.getElement());

        return $select.val();
    }

    showError(errorMessage) {
        const $selectBlock = this.getElement();

        $selectBlock.addClass('error');

        $('.error-message', $selectBlock).text(errorMessage);
    }

    hideError() {
        const $selectBlock = this.getElement();

        $selectBlock.removeClass('error');

        $('.error-message', $selectBlock).text('');
    }

    toggleError(errorMessages) {
        if (errorMessages && errorMessages.length) {
            this.showError(errorMessages[0]);
        } else {
            this.hideError();
        }
    }
}
