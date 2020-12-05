import api     from '../apiSingleton.js';
import Session from '../Module/Session';
import {
    abortAccessDenied,
    abortNotFound,
    displayPage
} from '../Utils/Page';

export default class Base {
    constructor() {
        this.api = api;
        this.abortAccessDenied = abortAccessDenied;
        this.abortNotFound = abortNotFound;

        this.checkAuthorisation();
    }

    checkAuthorisation()    {
        if (!this.isAuthorized()) {
            this.abortAccessDenied();
        }
    }

    isAuthorized() {
        return Session.isAuth();
    }

    render(page) {
        displayPage(page);
    }
}
