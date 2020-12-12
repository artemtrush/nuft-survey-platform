import DropdownInput from './../DropdownInput/DropdownInput.js';

export default class CurriculumInput extends DropdownInput {
    defaultParams() {
        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            title      : 'Назва освітньо-професійної програми',
            dataLoader : async (search) => {
                return this.curriculumsLoader(search);
            }
        };
    }

    setPeriod(period) {
        this.params.period = period;

        if (period) {
            this.enable();
        } else {
            this.clear();
            this.disable();
        }
    }

    getСurriculumId() {
        return this.getDropdownValue();
    }

    async curriculumsLoader(search) {
        if (!search || search.length < 3 || !this.params.period) {
            return [];
        }

        const params = {
            name   : search,
            period : this.params.period
        };

        const curriculums = await this.api.curriculums.list(params);

        const data = [];

        for (const curriculum of curriculums) {
            data.push({
                value : curriculum.id,
                text  : curriculum.name
            });
        }

        return data;
    }

    async events() {
        await super.events();

        const $block = this.getElement();

        $block.addClass('CurriculumInput');

        this.disable();
    }
}
