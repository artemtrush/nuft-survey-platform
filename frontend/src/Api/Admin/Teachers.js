import Base from './../Base';

export default class Teachers extends Base {
    async list(params) {
        return await this.apiClient.get('teachers', {}, params);
    }
    async show(id, params) {
        return await this.apiClient.get(`teachers/${id}`, {}, params);
    }
    async update(id, params) {
        return await this.apiClient.post(`teachers/${id}`, params);
    }
    async updateStatus(id, params) {
        return await this.apiClient.post(`teachers/${id}/status`, params);
    }
}
