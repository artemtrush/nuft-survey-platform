import Base from './../Base';

export default class Confirmations extends Base {
    async create(params) {
        return await this.apiClient.post('confirmations', params, {});
    }
}
