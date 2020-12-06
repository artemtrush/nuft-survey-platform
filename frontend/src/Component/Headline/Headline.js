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
        const { id } = this.params;

        const $headline = $(`#${id}`);

        $headline.addClass('Headline');
    }
}
