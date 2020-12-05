import Base from './../Base';

export default class Sessions extends Base {
    async create(params) {
        return await this.apiClient.post('sessions', params, {});
    }
}
