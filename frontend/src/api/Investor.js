import Base from './Base';

export default class Investor extends Base {
    async index(params) {
        return await this.apiClient.get('investor', {}, params);
    }
    async show(Id, params) {
        return await this.apiClient.get(`investor/${Id}`, {}, params);
    }
}
