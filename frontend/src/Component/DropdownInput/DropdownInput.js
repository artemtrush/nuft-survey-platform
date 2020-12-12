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

        let stopDebounce = false;
        const debounceTimeout = 300;

        // eslint-disable-next-line func-style
        const closingHandler = () => {
            stopDebounce = true;
            setTimeout(() => ( stopDebounce = false ), debounceTimeout + 100);
        };

        $input.on('input change', this.utils.debounce(async () => {
            if (stopDebounce) return;

            $block.attr('dropdown-data-value', '');

            const data = await this.params.dataLoader(this.getValue());

            if (stopDebounce) return;

            this._renderDropdown(data);
            this._openDropdown();
        }, debounceTimeout));

        $block.on('click', '.input-dropdown span', function () {
            const $option = $(this);

            that._closeDropdown();
            closingHandler();

            $block.attr('dropdown-data-value', $option.attr('data-value'));

            that.setValue($option.text());
            $input.trigger('change');
        });

        $input.on('blur', () => {
            setTimeout(() => {
                that._closeDropdown();
                closingHandler();
            }, 200);
        });
    }

    getDropdownValue() {
        const $block = this.getElement();
        const value = $block.attr('dropdown-data-value');

        return value || null;
    }

    _renderDropdown(options) {
        const $block = this.getElement();

        const optionsHtml = [];

        for (const option of options) {
            optionsHtml.push(`
                <span data-value="${option.value}">${option.text}</span>
            `);
        }

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
