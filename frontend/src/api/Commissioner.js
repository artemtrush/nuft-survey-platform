import Base from './Base';

export default class Commissioner extends Base {
    async index(params) {
        return await this.apiClient.get('commissioner', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`commissioner/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('commissioner', params, {});
    }
    async update(Id, params) {
        return await this.apiClient.post(`commissioner/${Id}`, params, {});
    }
    async delete(Id) {
        return await this.apiClient.delete(`commissioner/${Id}`);
    }
}
