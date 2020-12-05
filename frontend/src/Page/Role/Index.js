import Base from "./Base";

export default class Index extends Base {
    async init() {
        const permissions = await this.getConfigPermissions();

        const columns = [
            {name: 'Name', data: row => _.escape(row.Name)},
            {
                name: 'Permissions',
                data: row => _.escape(
                    Object.values(row.Permissions)
                        .map(key => permissions[ key ])
                        .join(', ')
                )
            },
            {
                name: 'PermittedCompanies',
                data: row => {
                    const permittedCompanies = Object.values(row.PermittedCompanies);
                    if (!permittedCompanies.length) {
                        return 'Все';
                    }

                    return permittedCompanies
                        .map(companyId => this.page.linkForEntityShowPage('company', companyId))
                        .join('');
                }
            }
        ];

        columns.push({
            data: row => {
                const params = {
                    Id: row.Id
                };

                return `
                    <div style="text-align:center;">
                        <a type="button" class="btn btn-primary btn-sm" href="${this.pathFor('role_update', params)}">
                            <i class="fa fa-edit"></i>
                        </a>
                        <a type="button" class="btn btn-danger btn-sm" href="${this.pathFor('role_delete', params)}">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </div>
                `;
            },
            sortable: false,
            searchable: false
        });

        await this.initDataTable({
            columns,
            apiUrl: 'role',
            dataColumn: 'Roles',
            order: [[ 0, "asc" ]],
            actions: `
                <a href="${this.pathFor('role_create')}" class="btn btn-sm btn-primary btn-flat pull-left">
                    Добавить роль
                </a>
            `
        });
    }

    header() {
        return 'Список ролей';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Роль</th>
            <th>Права</th>
            <th>Доступные МФО</th>
            <th style="width:20%">Управление</th>
        `);
    }
}
