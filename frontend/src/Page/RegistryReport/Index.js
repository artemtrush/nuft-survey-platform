import Base from "../Base";

export default class Index extends Base {

    async init() {
        const columns = [
            {name: 'Id', data: row => row.Id},
            {name: 'OperationDate', data: row => this.date.formatDate(row.OperationDate, 'DD-MM-YYYY')},
            {name: 'IsEmpty', data: row => row.IsEmpty ? 'Да' : 'Нет'}
        ];

        columns.push({
            data: row => {
                return this.component.ActionButton({
                    'Id': `registry-report-file-${row.Id}`,
                    'Text': 'Скачать',
                    'Action': async () => {
                        const res = await this.api.registryReportFile.show(row.Id);
                        this.file.readFileStream(res);
                    }
                });
            },
            sortable: false
        });

        await this.initDataTable({
            columns,
            apiUrl: 'registry_report',
            dataColumn: 'RegistryReports',
            order: [[ 1, 'desc' ]]
        });
    }

    header() {
        return 'Список отчетов реестра 1С';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Отчет за дату</th>
            <th>Отчет пустой</th>
            <th>Управление</th>
        `);
    }
}
