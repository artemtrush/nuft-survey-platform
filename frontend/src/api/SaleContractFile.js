import Base from './Base';

export default class SaleContractFile extends Base {
    async show(SaleContractId, params) {
        return await this.apiClient.get(`sale_contract/${SaleContractId}/file`, {}, params);
    }
}
