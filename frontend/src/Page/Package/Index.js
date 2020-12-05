import Base from "./Base";

export default class Index extends Base {
    async init() {
        const columns = [
            {name: 'Id',        data: row => row.Id},
            {name: 'Name',      data: row => _.escape(row.Name)},
            {name: 'CreatedAt', data: row => this.date.formatDateTime(row.CreatedAt)},
            {name: 'UpdatedAt', data: row => this.date.formatDateTime(row.UpdatedAt)}
        ];

        columns.push({
            data: row => {
                const params = {
                    Id: row.Id
                };

                return `
                    <div style="text-align:center;">
                        <a
                            type="button"
                            class="btn btn-primary btn-sm"
                            href="${this.pathFor('package_update', params)}"
                        >
                            <i class="fa fa-edit"></i>
                        </a>
                        <a
                            type="button"
                            class="btn btn-danger btn-sm"
                            href="${this.pathFor('package_delete', params)}"
                        >
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </div>
                `;
            },
            sortable: false,
            searchable: false
        });

        const actions = `
            <a href="${this.pathFor('package_create')}" class="btn btn-sm btn-primary btn-flat pull-left">
                Добавить пакет
            </a
        `;

        await this.initDataTable({
            columns,
            apiUrl: 'package',
            dataColumn: 'Packages',
            order: [[ 0, "desc" ]],
            actions
        });
    }

    header() {
        return 'Список пакетов';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Название</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th>Управление</th>
        `);
    }
}
