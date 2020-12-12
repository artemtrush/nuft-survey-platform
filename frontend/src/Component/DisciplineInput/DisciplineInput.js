import DropdownInput from './../DropdownInput/DropdownInput.js';

export default class DisciplineInput extends DropdownInput {
    defaultParams() {
        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            title      : 'Назва дисципліни',
            dataLoader : async (search) => {
                return this.disciplinesLoader(search);
            }
        };
    }

    setСurriculumId(curriculumId) {
        this.params.curriculumId = curriculumId;
    }

    async disciplinesLoader(search) {
        if (!search || search.length < 3 || !this.params.curriculumId) {
            return [];
        }

        const params = {
            name         : search,
            curriculumId : this.params.curriculumId
        };

        const disciplines = await this.api.disciplines.list(params);

        const data = [];

        for (const discipline of disciplines) {
            data.push({
                value : discipline.id,
                text  : discipline.name
            });
        }

        return data;
    }

    async events() {
        await super.events();

        const $block = this.getElement();

        $block.addClass('DisciplineInput');

        // this.disable();
    }
}
