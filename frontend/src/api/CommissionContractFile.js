import Base from './Base';

export default class CommissionContractFile extends Base {
    async show(CommissionContractId, params) {
        return await this.apiClient.get(`commission_contract/${CommissionContractId}/file`, {}, params);
    }
}
