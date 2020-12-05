import Base from './../Base';

export default class Surveys extends Base {
    async list(params) {
        return await this.apiClient.get('surveys', {}, params);
    }
}
