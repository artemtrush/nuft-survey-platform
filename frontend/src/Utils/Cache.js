import {currentTimestamp} from './Date';
import {toInt} from './Math';

const DEFAULT_EXPIRATION_TIME = 60; // 1 min
const CACHE_KEY_PREFIX = 'Cache_';

export default class Cache {
    constructor() {
        this.removeOutdatedItems();
    }

    stringIsCacheKey(str)    {
        return str.indexOf(CACHE_KEY_PREFIX) !== -1;
    }

    formatCacheKey(cacheKey)    {
        if (this.stringIsCacheKey(cacheKey)) {
            return cacheKey;
        }

        return CACHE_KEY_PREFIX + cacheKey;
    }

    removeOutdatedItems() {
        const keys = Object.keys(localStorage);
        if (keys && keys instanceof Array) {
            keys.forEach(key => {
                if (this.stringIsCacheKey(key)) {
                    this.getItem(key);
                }
            });
        }
    }

    getItem(cacheKey) {
        cacheKey = this.formatCacheKey(cacheKey);
        let result = localStorage.getItem(cacheKey);
        result = result ? JSON.parse(result) : null;

        if (result &&
            result instanceof Object &&
            result.hasOwnProperty('expirationTime') &&
            result.hasOwnProperty('value')
        ) {
            if (currentTimestamp() < toInt(result.expirationTime)) {
                return result.value;
            } else {
                localStorage.removeItem(cacheKey);
            }
        }

        return false;
    }

    setItem(cacheKey, value, expirationTime = DEFAULT_EXPIRATION_TIME) {
        cacheKey = this.formatCacheKey(cacheKey);

        localStorage.setItem(cacheKey, JSON.stringify({
            expirationTime: currentTimestamp() + toInt(expirationTime),
            value
        }));

        return true;
    }
}
