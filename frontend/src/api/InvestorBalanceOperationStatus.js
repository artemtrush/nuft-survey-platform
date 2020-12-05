import Base from './Base';

export default class InvestorBalanceOperationStatus extends Base {
    async update(BalanceOperationId, params) {
        return await this.apiClient.put(
            `investor/${params.InvestorId}/balance_operation/${BalanceOperationId}/status`,
            params
        );
    }
}
