import Base from './../Base';

export default class Surveys extends Base {
    async list(params) {
        return await this.apiClient.get('surveys', {}, params);
    }
    async create(params) {
        return await this.apiClient.post('surveys', params, {});
    }
    async updateStatus(id, params) {
        return await this.apiClient.post(`surveys/${id}/status`, params);
    }
}
