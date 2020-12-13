import Base from './../Base';

export default class Groups extends Base {
    async list(params) {
        return await this.apiClient.get('groups', {}, params);
    }
    async create(params) {
        return await this.apiClient.post('groups', params, {});
    }
}
