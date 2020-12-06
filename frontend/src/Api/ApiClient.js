import 'whatwg-fetch';

import queryString from 'query-string';
import FormData from 'form-data';
import Session from '../Module/Session';

export default class ApiClient {
    constructor({ prefix = 'api/v1' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    post(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete'
        });
    }

    async request({ url, method, params = {}, body }) {
        const urlWithQuery = `${url}?${queryString.stringify(params)}`;
        const init = body instanceof FormData
            ? this._makeFormDataRequest(method, body)
            : this._makeJsonRequest(method, body);

        try {
            const res = await fetch(`${this.prefix}/${urlWithQuery}`, init);

            // Server error
            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }

            // Access denied
            const data = await res.json();

            if (data.token) {
                Session.setJWT(data.token);
            }

            if (data.error && data.error.type && data.error.type === 'ACCESS_DENIED') {
                // @REMOVE TODO ABORT ACCESS DENIED
            }

            return data;
        } catch (error) {
            console.error(error);

            return {
                Status: 0,
                Message: error.message,
                Error: {}
            };
        }
    }

    _makeJsonRequest(method, body) {
        const init = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        const jwt = Session.getJWT();

        if (jwt) {
            init.headers.Authorization = jwt;
        }

        if (method !== 'get' && method !== 'head') {
            init.body = JSON.stringify(body);
        }

        return init;
    }

    _makeFormDataRequest(method, body) {
        const init = {
            method,
            body,
            headers: {
                'Accept': 'application/json'
            }
        };

        const jwt = Session.getJWT();

        if (jwt) {
            init.headers.Authorization = jwt;
        }

        return init;
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }
}
