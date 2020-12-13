import ComponentBase from './../Component/Base';

export default class Base extends ComponentBase {
    units = {};

    async triggerUnitsEvents() {
        return Promise.all(Object.values(this.units).map(unit => unit.events()));
    }
}
