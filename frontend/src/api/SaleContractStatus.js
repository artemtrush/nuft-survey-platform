import Base from './Base';

export default class SaleContractStatus extends Base {
    async update(SaleContractId, params) {
        return await this.apiClient.put(`sale_contract/${SaleContractId}/status`, params);
    }
}
