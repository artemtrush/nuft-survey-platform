import Base from './../Base';

export default class Curriculums extends Base {
    async list(params) {
        return await this.apiClient.get('curriculums', {}, params);
    }
    async create(params) {
        return await this.apiClient.post('curriculums', params, {});
    }
}
