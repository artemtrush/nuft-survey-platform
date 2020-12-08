// import { v4 as uuidv4 }     from 'uuid';

import api                  from './../apiSingleton.js';
import components           from './index';

import config               from "./../Utils/Config";
import Cache                from "./../Utils/Cache";
import * as MathUtils       from "./../Utils/Math";
import * as DateUtils       from "./../Utils/Date";
import * as CommonUtils     from "./../Utils/Common";

export default class Base {
    constructor(params = {}) {
        this.params = { ...this.defaultParams(), ...params };

        this.api = api;
        this.components = components;

        this.config = config;
        this.cache = new Cache();

        this.math = MathUtils;
        this.date = DateUtils;
        this.utils = CommonUtils;
    }

    defaultParams() {
        return {};
    }

    uuid() {
        // @REMOVE USE LIB
        if (!window.UUID) {
            window.UUID = 0;
        }

        window.UUID += 1;

        return `uuid-${window.UUID}`;

        // return uuidv4();
    }

    async html() {
        return '';
    }

    async events() {

    }
}
