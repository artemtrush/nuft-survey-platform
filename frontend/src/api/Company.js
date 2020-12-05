import Base from './Base';

export default class Company extends Base {
    async index(params) {
        return await this.apiClient.get('company', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`company/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('company', params, {});
    }
    async update(Id, params) {
        return await this.apiClient.post(`company/${Id}`, params, {});
    }
    async delete(Id) {
        return await this.apiClient.delete(`company/${Id}`);
    }
}
