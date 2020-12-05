import Base from './Base';

export default class RegistryReportFile extends Base {
    async show(RegistryReportId, params) {
        return await this.apiClient.get(`registry_report/${RegistryReportId}/file`, {}, params);
    }
}
