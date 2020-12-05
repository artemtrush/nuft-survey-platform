import Base from './Base';

export default class Calendar extends Base {
    async show(params) {
        return await this.apiClient.get(`calendar`, {}, params);
    }
    async update(params) {
        return await this.apiClient.put(`calendar`, params);
    }
}
