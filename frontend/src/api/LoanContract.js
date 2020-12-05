import Base from './Base';

export default class LoanContract extends Base {
    async index(params) {
        return await this.apiClient.get('loan_contract', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`loan_contract/${Id}`, {}, params);
    }
    async create(params) {
        return await this.apiClient.post('loan_contract', params, {});
    }
}
