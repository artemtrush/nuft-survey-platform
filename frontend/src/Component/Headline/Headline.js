import Caption from './../Caption/Caption.js';

export default class Headline extends Caption {
    defaultParams() {
        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            align : 'left',
            size  : 'large'
        };
    }

    async events() {
        const $headline = this.getElement();

        $headline.addClass('Headline');
    }
}
