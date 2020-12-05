import Base from './Base';

export default class SessionsAPI extends Base {
    async create(params) {
        return await this.apiClient.post('session', params, {});
    }
}
