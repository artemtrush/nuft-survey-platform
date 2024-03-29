import DropdownInput from './../DropdownInput/DropdownInput.js';

export default class GroupInput extends DropdownInput {
    defaultParams() {
        const defaultParams = super.defaultParams();

        return {
            ...defaultParams,
            title      : 'Шифр групи',
            dataLoader : async (search) => {
                return this.groupsLoader(search);
            }
        };
    }

    setСurriculumId(curriculumId) {
        this.params.curriculumId = curriculumId;
    }

    setСurriculumName(curriculumName) {
        this.params.curriculumName = curriculumName;

        if (curriculumName) {
            this.enable();
        } else {
            this.clear();
            this.disable();
        }
    }

    getGroupId() {
        return this.getDropdownValue();
    }

    setGroupId(groupId) {
        this.setDropdownValue(groupId);
    }

    getGroupName() {
        return this.getValue();
    }

    async groupsLoader(search) {
        if (!search || search.length < 3 || !this.params.curriculumId) {
            return [];
        }

        const params = {
            name         : search,
            curriculumId : this.params.curriculumId
        };

        const groups = await this.api.groups.list(params);

        const data = [];

        for (const group of groups) {
            data.push({
                value : group.id,
                text  : group.name
            });
        }

        return data;
    }

    async events() {
        await super.events();

        const $block = this.getElement();

        $block.addClass('GroupInput');
    }
}
