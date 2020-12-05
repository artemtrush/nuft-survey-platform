import Base from './Base';

export default class CommissionerCommissionContract extends Base {
    async index(params) {
        return await this.apiClient.get(`commissioner/${params.CommissionerId}/commission_contract`, {}, params);
    }
}
