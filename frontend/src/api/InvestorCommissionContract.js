import Base from './Base';

export default class InvestorCommissionContract extends Base {
    async index(params) {
        return await this.apiClient.get(`investor/${params.InvestorId}/commission_contract`, {}, params);
    }
}
