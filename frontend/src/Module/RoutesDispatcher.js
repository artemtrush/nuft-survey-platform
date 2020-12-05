export default class RoutesDispatcher {
    constructor(routes, precall, postcall) {
        this.routes = routes;
        this.precall = precall;
        this.postcall = postcall;
        this.usedLinkRoute = false;
    }

    redirectTo(route, captures) {
        const hash = this.urlFor(route, captures);
        this.redirectToHash(hash);
    }

    redirectToHash(hash) {
        window.location.hash = hash;
    }

    start() {
        const self = this;

        $(window).unbind('hashchange').bind('hashchange', () => {
            if (this.usedLinkRoute === true) {
                this.usedLinkRoute = false;

                return;
            }

            this.parseUriParams();
            this._dispatch(window.location.hash);
        });

        $(document).on('click', 'a', async function (ev) {
            const hash = $(this).attr('href');

            if (!hash || !hash.match(/^\#.+?/)) {
                return;
            }

            ev.preventDefault();

            const result = await self._dispatch(hash);

            if (result !== false) {
                self.usedLinkRoute = true;
                window.location.hash = hash;
            }
        });
    }

    trigger() {
        $(window).trigger('hashchange');
    }

    absoluteUrlFor(routeName, captures) {
        return window.location.href.split(/\?|#/)[0] + this.urlFor(routeName, captures);
    }

    urlFor(routeName, captures) {
        // Find pattern
        let pattern;

        for (let i = 0; i < this.routes.length; i++) {
            if (routeName === this.routes[i].name) {
                pattern = this.routes[i].pattern;
                break;
            }
        }

        if (!pattern) {
            return routeName;
        }

        const keys = Object.keys(captures || {});

        keys.forEach(key => {
            const re = new RegExp(`[:*]${key}`, 'g');
            pattern = pattern.replace(re, captures[key]);
        });

        // Clean not replaces placeholders
        pattern = pattern.replace(/[:*][^/.]+/g, '');

        return `#${pattern}`;
    }

    match(locationHash) {
        const location = locationHash.replace(/^#/, '').replace(/;.+$/, '');

        const captures = {};
        let route;

        this.routes.forEach((innerRoute) => {
            const pattern = innerRoute.pattern.replace(/:\w+/g, '([^/]+)');
            const re = new RegExp(`^${pattern}$`);
            const matched = location.match(re);
            if (matched) {
                // Find capture names
                const capturesNames = [];
                const capturesRe = /:(\w+)/g;
                let found;
                while ((found = capturesRe.exec(innerRoute.pattern)) !== null) {
                    capturesNames.push(found[1]);
                }

                // Collect found captures
                capturesNames.forEach((name, index) => {
                    captures[name] = matched[index + 1];
                });

                // Take route
                route = innerRoute;
            }
        });

        let res = {};

        if (route) {
            captures.route = route;
            res = captures;
        } else {
            if (window.location.hash && window.location.hash !== '#') {
                this.redirectToHash('#index');
            }

            res = null;
        }

        return res;
    }

    async _dispatch(hash) {
        const captures = this.match(hash) || this.match(window.location.pathname);
        let result = false;

        if (captures) {
            const route = captures.route;

            if ($.isFunction(this.precall)) {
                if (!this.precall(captures)) {
                    return result;
                }
            }

            if ($.isFunction(route.cb)) {
                result = await route.cb(captures);
            }

            if ($.isFunction(this.postcall)) {
                this.postcall(captures);
            }
        }

        return result;
    }

    parseUriParams() {
        const location = window.location.href.replace(/^.+#/, '#').replace(/^#/, '');
        const uriParamsMatches = /;(.+)$/.exec(location);
        const uriParams = {};

        if (uriParamsMatches && uriParamsMatches[1] !== undefined) {
            const paramsArray = uriParamsMatches[1].split(';');
            paramsArray.forEach(keyValue => {
                const keyValueSplitted = keyValue.split('=');
                uriParams[keyValueSplitted[0]] = keyValueSplitted[1] !== undefined ? keyValueSplitted[1] : true;
            });
        }

        window.uriParams = uriParams;
    }

    setUriParam(key, value) {
        window.uriParams[key] = value;

        this.setUriParamToLocation();
    }

    removeUriParam(key) {
        delete window.uriParams[key];

        this.setUriParamToLocation();
    }

    setUriParamToLocation() {
        let uriParamsString = '';

        for (const k in window.uriParams) {
            uriParamsString += `;${k}=${window.uriParams[k]}`;
        }

        window.location.href = window.location.href.replace(/;.+$/, '') + uriParamsString;
        this.parseUriParams();
    }
}
