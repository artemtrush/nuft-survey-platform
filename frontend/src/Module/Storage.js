export default class Storage {
    Data = {};

    get(key) {
        return this.Data[key];
    }

    set(key, value) {
        this.Data[key] = value;
    }

    clean() {
        this.Data = {};
    }
}
