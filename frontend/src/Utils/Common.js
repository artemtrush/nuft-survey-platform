import routes from '../Module/Routes';


export function reload() {
    window.location.reload();
}

export function redirect(routeName, params = {}) {
    const path = pathFor(routeName, params);

    window.location.hash = path;
}

export function pathFor(routeName, params = {}) {
    let linkPath = '#';

    Object.keys(routes).some(path => {
        const route = routes[ path ];
        // eslint-disable-next-line eqeqeq
        if ('name' in route && route.name == routeName) {
            linkPath += path;
            return true;
        }
    });

    Object.keys(params).sort((a, b) => {
        return b.length - a.length;
    }).forEach(key => {
        linkPath = linkPath.replace(':' + key, params[ key ]);
    });

    return linkPath;
}

export function debounce(callback, timeout = 250) {
    let timeoutId = null;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(this, args);
        }, timeout);
    };
}
