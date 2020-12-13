import Input from './../Input/Input.js';

import './DropdownInput.less';

export default class DropdownInput extends Input {
    defaultParams() {
        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            dataLoader : () => {
                return [];
            }
        };
    }

    async events() {
        await super.events();

        // eslint-disable-next-line consistent-this
        const that = this;

        const $block = this.getElement();

        $block.addClass('DropdownInput');

        const $input = $('input', $block);

        let timeoutId = null;
        let lastRequestId = null;
        let preventChangeEvent = false;

        function clearRequests() {
            clearTimeout(timeoutId);

            const requestId = that.uuid();
            lastRequestId = requestId;

            return requestId;
        }

        $input.on('keydown input change', () => {
            if (preventChangeEvent) {
                return;
            }

            const requestId = clearRequests();

            const search = this.getValue();
            this.setDropdownValue('');

            timeoutId = setTimeout(async () => {
                const data = await this.params.dataLoader(search);

                if (requestId !== lastRequestId || search !== this.getValue()) {
                    return;
                }

                this._renderDropdown(data);
                this._openDropdown();
            }, 300);
        });

        $block.on('mousedown', '.input-dropdown span', function () {
            const $option = $(this);

            clearRequests();
            that._closeDropdown();

            preventChangeEvent = true;

            that.setDropdownValue($option.attr('data-value'));
            that.setValue($option.text());

            setTimeout(() => ( preventChangeEvent = false ), 100);
        });

        $input.on('blur', () => {
            clearRequests();
            this._closeDropdown();
        });
    }

    getDropdownValue() {
        const $block = this.getElement();
        const value = $block.attr('dropdown-data-value');

        return value || null;
    }

    setDropdownValue(value) {
        const $block = this.getElement();
        $block.attr('dropdown-data-value', value || '');
    }

    _renderDropdown(options) {
        const $block = this.getElement();

        const optionsHtml = [];

        for (const option of options) {
            optionsHtml.push(`
                <span data-value="${option.value}">${option.text}</span>
            `);
        }

        $('.input-dropdown', $block).remove();

        $block.append(`
            <div class="input-dropdown">
                ${optionsHtml.join('')}
            </div>
        `);
    }

    _openDropdown() {
        const $block = this.getElement();

        const optionsCount = $('.input-dropdown span', $block).length;

        if (!optionsCount) {
            this._closeDropdown();
            return;
        }

        $block.addClass('dropdown-opened');
    }

    _closeDropdown() {
        const $block = this.getElement();

        $block.removeClass('dropdown-opened');
    }
}
