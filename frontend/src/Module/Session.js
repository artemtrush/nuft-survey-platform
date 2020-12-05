export default class Session {
    static isAuth() {
        return localStorage.getItem('AdminJWT') !== null;
    }

    static logout() {
        localStorage.removeItem('AdminJWT');
    }

    static setJWT(jwt) {
        localStorage.setItem('AdminJWT', jwt);
    }

    static getJWT() {
        return localStorage.getItem('AdminJWT');
    }

    static setUserId(userId) {
        localStorage.setItem('AdminUserId', userId);
    }

    static getUserId() {
        return localStorage.getItem('AdminUserId');
    }
}
