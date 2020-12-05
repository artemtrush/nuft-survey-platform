import Base from './Base';

export default class UserProfile extends Base {
    async update(params) {
        return await this.apiClient.put(`user/profile`, params);
    }
}
