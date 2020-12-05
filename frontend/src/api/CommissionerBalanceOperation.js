import Base from './Base';

export default class CommissionerBalanceOperation extends Base {
    async update(Id, params) {
        return await this.apiClient.put(`commissioner/${params.CommissionerId}/balance_operation/${Id}`, params);
    }
    async index(params) {
        return await this.apiClient.get(`commissioner/${params.CommissionerId}/balance_operation`, {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`commissioner/${params.CommissionerId}/balance_operation/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post(`commissioner/${params.CommissionerId}/balance_operation`, params, {});
    }
}
