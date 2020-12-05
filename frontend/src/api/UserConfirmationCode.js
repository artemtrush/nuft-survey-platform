import Base from './Base';

export default class UserConfirmationCode extends Base {
    async create(params) {
        return await this.apiClient.post(`user/${params.UserId}/confirmation_code`, params, {});
    }
}
