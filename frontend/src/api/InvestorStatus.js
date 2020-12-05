import Base from './Base';

export default class InvestorStatus extends Base {
    async update(InvestorId, params) {
        return await this.apiClient.put(`investor/${InvestorId}/status`, params);
    }
}
