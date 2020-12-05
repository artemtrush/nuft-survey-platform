export default class Session {
    static isAuth() {
        return localStorage.getItem('SessionJWT') !== null;
    }

    static logout() {
        localStorage.removeItem('SessionJWT');
    }

    static setJWT(jwt) {
        localStorage.setItem('SessionJWT', jwt);
    }

    static getJWT() {
        return localStorage.getItem('SessionJWT');
    }

    static setUserId(userId) {
        localStorage.setItem('SessionUserId', userId);
    }

    static getUserId() {
        return localStorage.getItem('SessionUserId');
    }
}
