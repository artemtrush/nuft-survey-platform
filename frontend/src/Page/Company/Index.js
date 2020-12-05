import Base from "./Base";

export default class Index extends Base {
    async init() {
        const columns = [
            {name: 'Id',        data: row => row.Id},
            {name: 'Code',      data: row => row.Code},
            {name: 'Name',      data: row => _.escape(row.Name)},
            {
                name: 'Package',
                data: row => _.escape(row.Package.Name),
                sortable: false,
                searchable: false
            },
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
                            class="btn btn-success btn-sm"
                            href="${this.pathFor('company_update', params)}"
                        >
                            Карточка МФО
                        </a>
                        <a
                            type="button"
                            class="btn btn-danger btn-sm"
                            href="${this.pathFor('company_delete', params)}"
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
            <a href="${this.pathFor('company_create')}" class="btn btn-sm btn-primary btn-flat pull-left">
                Добавить МФО
            </a
        `;

        await this.initDataTable({
            columns,
            apiUrl: 'company',
            dataColumn: 'Companies',
            order: [[ 0, "desc" ]],
            actions
        });
    }

    header() {
        return 'Список МФО';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Код 1С</th>
            <th>Название</th>
            <th>Пакет</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th>Управление</th>
        `);
    }
}
