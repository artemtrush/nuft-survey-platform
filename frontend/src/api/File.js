import Base from './Base';

export default class File extends Base {
    async create(params) {
        return await this.apiClient.post('file', params, {});
    }
}
