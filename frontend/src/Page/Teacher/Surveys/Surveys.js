import Base from './../../Base';

import './Surveys.less';

export default class Surveys extends Base {
    async initUnits() {

    }

    async html() {
        await this.initUnits();

        return `
            <div class="Surveys page">

            </div>
        `;
    }

    async events() {
        await this.triggerUnitsEvents();
    }
}
