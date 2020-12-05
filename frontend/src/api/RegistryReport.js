import Base from './Base';

export default class RegistryReport extends Base {
    async index(params) {
        return await this.apiClient.get('registry_report', {}, params);
    }
}
