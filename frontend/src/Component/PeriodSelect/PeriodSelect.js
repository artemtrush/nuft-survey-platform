import Select from './../Select/Select.js';

export default class PeriodSelect extends Select {
    defaultParams() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const currentPeriodLeft = currentMonth >= 8 ? currentYear : currentYear - 1;
        const currentPeriod = `${currentPeriodLeft}/${currentPeriodLeft + 1}`;

        const periods = [];

        for (let i = -1; i < 10; i++) {
            const periodLeft = currentPeriodLeft - i;
            const period = `${periodLeft}/${periodLeft + 1}`;

            periods.push({
                value : period,
                text  : period
            });
        }

        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            title         : 'Навчальний рік',
            selectedValue : currentPeriod,
            dataLoader    : () => {
                return periods;
            }
        };
    }

    getPeriod() {
        return this.getValue();
    }

    async events() {
        await super.events();

        const $block = this.getElement();

        $block.addClass('PeriodSelect');
    }
}
