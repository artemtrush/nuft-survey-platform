import Base from './Base';

export default class CommissionerBalanceOperationStatus extends Base {
    async update(BalanceOperationId, params) {
        return await this.apiClient.put(
            `commissioner/${params.CommissionerId}/balance_operation/${BalanceOperationId}/status`,
            params
        );
    }
}
