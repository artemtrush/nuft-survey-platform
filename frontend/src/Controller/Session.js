import Base from './Base';
import SessionModule from '../Module/Session';
import Login from '../Page/Login';
import NotLoggedInContainer from '../Page/Container/NotLoggedInContainer';

export default class Session extends Base {
    checkAuthorisation() {
    }

    async create() {
        if (this.isAuthorized()) {
            return this.abortAccessDenied();
        }

        this.render(new Login());
    }

    async delete() {
        if (!this.isAuthorized()) {
            return this.abortAccessDenied();
        }

        SessionModule.logout();
        Storage.clean();
        this.render(new NotLoggedInContainer());
        window.dispatcher.redirectToHash('session/create');
    }
}
