import Base from './Base';

export default class CommissionContract extends Base {
    async index(params) {
        return await this.apiClient.get('commission_contract', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`commission_contract/${Id}`, {}, params);
    }
}
