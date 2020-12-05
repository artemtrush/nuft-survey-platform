import Base from './Base';

export default class Config extends Base {
    async show(key, params) {
        return await this.apiClient.get(`config/${key}`, params);
    }
}
