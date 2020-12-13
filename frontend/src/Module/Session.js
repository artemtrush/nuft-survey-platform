export default class Session {
    static setJWT(jwt) {
        localStorage.setItem('SessionJWT', jwt || null);
    }

    static getJWT() {
        return localStorage.getItem('SessionJWT');
    }

    static setTeacherId(teacherId) {
        localStorage.setItem('SessionTeacherId', teacherId || null);
    }

    static getTeacherId() {
        return localStorage.getItem('SessionTeacherId');
    }

    static setAdminId(adminId) {
        localStorage.setItem('SessionAdminId', adminId || null);
    }

    static getAdminId() {
        return localStorage.getItem('SessionAdminId');
    }

    static isAuthorized() {
        return Boolean(Session.getJWT());
    }

    static isAuthorizedTeacher() {
        return Session.isAuthorized() && Boolean(Session.getTeacherId());
    }

    static isAuthorizedAdmin() {
        return Session.isAuthorized() && Boolean(Session.getAdminId());
    }

    static logout() {
        localStorage.removeItem('SessionJWT');
        localStorage.removeItem('SessionTeacherId');
        localStorage.removeItem('SessionAdminId');
    }
}
