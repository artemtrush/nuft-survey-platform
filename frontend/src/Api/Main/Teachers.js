import Base from './../Base';

export default class Teachers extends Base {
    async show(id, params) {
        return await this.apiClient.get(`teachers/${id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('teachers', params, {});
    }
    async update(id, params) {
        return await this.apiClient.post(`teachers/${id}`, params);
    }
}
