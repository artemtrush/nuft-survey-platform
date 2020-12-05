let instance = null;

class Config {
    constructor() {
        if (!instance) {
            instance = this; // eslint-disable-line

            const appConfig = window.appConfig;

            let key;
            for (key in appConfig) {
                if (Object.prototype.hasOwnProperty.call(appConfig, key)) {
                    this[key] = appConfig[key];
                }
            }
        }

        return instance;
    }

}

export default new Config();
