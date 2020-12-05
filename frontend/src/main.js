import Dispatcher from './Module/RoutesDispatcher.js';
import routes from './Module/Routes.js';
import Storage from './Module/Storage';

export default class Main {
    async init() {
        window.Storage = new Storage();

        const routesHandlers = Object.keys(routes).reduce((acc, route) => {
            acc.push({
                pattern: route,
                name: route,
                async cb(captures) {
                    const routeHandler = routes[route];
                    const controller = new routeHandler.controller();
                    return await controller.init(captures);
                }
            });
            return acc;
        }, []);

        window.dispatcher = new Dispatcher(routesHandlers);
        window.dispatcher.start();

        if (!window.location.hash.match(/\#.*$/)) {
            window.dispatcher.redirectToHash('entrance');
        } else {
            window.dispatcher.trigger();
        }
    }
}
