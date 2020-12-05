import Base from './Base';

export default class Role extends Base {
    async index(params) {
        return await this.apiClient.get('role', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`role/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('role', params, {});
    }
    async update(Id, params) {
        return await this.apiClient.put(`role/${Id}`, params);
    }
    async delete(Id) {
        return await this.apiClient.delete(`role/${Id}`);
    }
}
