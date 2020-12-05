import Base from './Base';

export default class User extends Base {
    async index(params) {
        return await this.apiClient.get('user', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`user/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('user', params, {});
    }
    async update(Id, params) {
        return await this.apiClient.put(`user/${Id}`, params);
    }
    async delete(Id) {
        return await this.apiClient.delete(`user/${Id}`);
    }
}
