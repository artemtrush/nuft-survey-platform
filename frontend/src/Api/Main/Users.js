import Base from './../Base';

export default class Users extends Base {
    async updatePassword(params) {
        return await this.apiClient.post(`users/password`, params);
    }
}
