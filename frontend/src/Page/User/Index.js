import Base from "./Base";

export default class Index extends Base {
    async init() {
        const columns = [
            {
                name: 'FullName',
                data: row => _.escape([
                    row.SecondName,
                    row.FirstName,
                    row.MiddleName
                ].join(' '))
            },
            {
                name: 'Roles',
                data: row => _.escape(
                    Object.values(row.Roles)
                        .map(role => role.Name)
                        .join(', ')
                ),
                sortable: false,
                searchable: false
            },
            {name: 'Email',     data: row => _.escape(row.Email)},
            {name: 'Phone',     data: row => _.escape(row.Phone)},
            {name: 'CreatedAt', data: row => this.date.formatDate(row.CreatedAt)}
        ];

        columns.push({
            data: row => {
                const params = {
                    Id: row.Id
                };

                return `
                    <div style="text-align:center;">
                        <a type="button" class="btn btn-primary btn-sm" href="${this.pathFor('user_update',
                         params)}"><i class="fa fa-edit"></i></a>
                        <a type="button" class="btn btn-danger btn-sm" href="${this.pathFor('user_delete',
                         params)}"><i class="fa fa-trash-o"></i></a>
                    </div>
                `;
            },
            sortable: false,
            searchable: false
        });

        const actions = `
            <a href="${this.pathFor('user_create')}" class="btn btn-sm btn-primary btn-flat pull-left">
                Добавить пользователя
            </a>
        `;

        await this.initDataTable({
            columns,
            apiUrl: 'user',
            dataColumn: 'Users',
            order: [[ 0, "asc" ]],
            actions
        });
    }

    header() {
        return 'Список пользователей';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>ФИО</th>
            <th>Роли</th>
            <th>E-mail</th>
            <th>Телефон</th>
            <th>Дата регистрации</th>
            <th>Управление</th>
        `);
    }
}
