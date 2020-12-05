import Base from "../Base";

export default class Index extends Base {

    async init() {
        const columns = [
            {name: 'Id', data: row => row.Id},
            {name: 'Code', data: row => _.escape(row.Code)},
            {
                name: 'FullName',
                data: row => _.escape([
                    row.SecondName,
                    row.FirstName,
                    row.MiddleName
                ].join(' '))
            },
            {name: 'AgreementDate', data: row => this.date.formatDate(row.AgreementDate)},
            {name: 'ExpirationDate', data: row => this.date.formatDate(row.ExpirationDate)},
            {name: 'Amount', data: row => _.escape(row.Amount)},
            {name: 'ObligationAmount', data: row => _.escape(row.ObligationAmount)},
            {name: 'Status', data: row => this.form.translateCommissionContractStatus(row.Status)},
            {name: 'ProlongationsCount', data: row => _.escape(row.ProlongationsCount), sortable: false}
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
                            href="${this.pathFor('commission_contract_show', params)}"
                        >
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                `;
            },
            sortable: false,
            searchable: false
        });

        await this.initDataTable({
            columns,
            apiUrl: 'commission_contract',
            dataColumn: 'CommissionContracts',
            order: [[ 0, "desc" ]]
        });
    }

    header() {
        return 'Список договоров комиссии';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Код 1С</th>
            <th>ФИО клиента</th>
            <th>Дата оформления</th>
            <th>Дата окончания</th>
            <th>Цена сделки, грн</th>
            <th>Сумма денежного обязательства, грн</th>
            <th>Статус</th>
            <th>Количество пролонгаций</th>
            <th>Управление</th>
        `);
    }
}
