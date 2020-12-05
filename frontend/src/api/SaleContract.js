import Base from './Base';

export default class SaleContract extends Base {
    async index(params) {
        return await this.apiClient.get('sale_contract', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`sale_contract/${Id}`, {}, params);
    }
    async update(Id, params) {
        return await this.apiClient.put(`sale_contract/${Id}`, params);
    }
}
