import Base from './Base';

export default class InvestorBalanceOperation extends Base {
    async update(Id, params) {
        return await this.apiClient.put(`investor/${params.InvestorId}/balance_operation/${Id}`, params);
    }
    async index(params) {
        return await this.apiClient.get(`investor/${params.InvestorId}/balance_operation`, {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`investor/${params.InvestorId}/balance_operation/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post(`investor/${params.InvestorId}/balance_operation`, params, {});
    }
}
