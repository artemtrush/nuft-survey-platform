import Base from './../Base';

export default class Disciplines extends Base {
    async list(params) {
        return await this.apiClient.get('disciplines', {}, params);
    }
    async create(params) {
        return await this.apiClient.post('disciplines', params, {});
    }
}
