import Dispatcher from './Module/RoutesDispatcher.js';
import routes from './Module/Routes.js';
import Session from "./Module/Session";
import NotLoggedInContainer from "./Page/Container/NotLoggedInContainer";
import LoggedInContainer from "./Page/Container/LoggedInContainer";
import { displayPage, loadStates } from "./Utils/Page";
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
                    const cont = new routeHandler.controller();
                    return await cont[routeHandler.method](captures);
                }
            });
            return acc;
        }, []);

        window.dispatcher = new Dispatcher(routesHandlers);

        if (Session.isAuth() && await loadStates()) {
            displayPage(new LoggedInContainer());
        } else {
            displayPage(new NotLoggedInContainer());
        }

        window.dispatcher.start();

        if (!window.location.hash.match(/\#.*$/)) {
            let routeName;

            if (Session.isAuth()) {
                routeName = 'index';
            } else {
                routeName = 'session/create';
            }

            window.dispatcher.redirectToHash(routeName);
        } else {
            window.dispatcher.trigger();
        }
    }
}
