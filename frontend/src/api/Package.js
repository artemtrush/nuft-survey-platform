import Base from './Base';

export default class Package extends Base {
    async index(params) {
        return await this.apiClient.get('package', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`package/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('package', params, {});
    }
    async update(Id, params) {
        return await this.apiClient.put(`package/${Id}`, params);
    }
    async delete(Id) {
        return await this.apiClient.delete(`package/${Id}`);
    }
}
