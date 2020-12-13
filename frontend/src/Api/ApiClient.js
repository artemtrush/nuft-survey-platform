import 'whatwg-fetch';

import queryString from 'query-string';
import FormData from 'form-data';
import Session from '../Module/Session';
import { redirect } from '../Utils/Common';

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

    _accessDenied() {
        Session.logout();
        redirect('entrance');
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
                return this._accessDenied();
            }

            const data = await res.json();

            if (data.error && data.error.type && data.error.type === 'ACCESS_DENIED') {
                return this._accessDenied();
            }

            return data;
        } catch (error) {
            console.error(error);

            return this._accessDenied();
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
}
