import Base from './Base';

export default class CommissionerSaleContract extends Base {
    async index(params) {
        return await this.apiClient.get(`commissioner/${params.CommissionerId}/sale_contract`, {}, params);
    }
}
