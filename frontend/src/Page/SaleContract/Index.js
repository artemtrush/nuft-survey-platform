import Base from "../Base";

export default class Index extends Base {

    async init() {
        const columns = [
            {name: 'CompanyId', data: row => this.page.linkForEntityShowPage('company', row.CompanyId)},
            {name: 'AgreementDate', data: row => this.date.formatDate(row.AgreementDate)},
            {
                name: 'LeftDays',
                data: row => this.date.getDatesDiffInDays(row.ExpirationDate, this.date.currentDate()),
                sortable: false
            },
            {name: 'Amount', data: row => _.escape(row.Amount)},
            {name: 'ObligationAmount', data: row => _.escape(row.ObligationAmount)},
            {
                name: 'PledgeContractAmount',
                data: row => _.escape(row.PledgeContract.Amount),
                sortable: false
            },
            {name: 'Code', data: row => _.escape(row.Code)},
            {
                name: 'Status',
                data: row => this.form.translateSaleContractStatus(row.ActualContract.Status),
                sortable: false
            },
            {
                name: 'PledgeContractCode',
                data: row => _.escape(row.PledgeContract.Code),
                sortable: false
            },
            {
                name: 'PledgeContractStatus',
                data: row => this.form.translateSaleContractStatus(row.PledgeContract.ActualContract.Status),
                sortable: false
            }
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
                            href="${this.pathFor('sale_contract_show', params)}"
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
            apiUrl: 'sale_contract',
            dataColumn: 'SaleContracts',
            order: [[ 1, "desc" ]]
        });
    }

    header() {
        return 'Список договоров КП и ДЗ';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>МФО</th>
            <th>Дата оформления</th>
            <th>Дней до окончания</th>
            <th>Цена ПТ</th>
            <th>Размер ПТ</th>
            <th>Залоговая стоимость</th>
            <th>Код 1С договора купли-продажи</th>
            <th>Статус актуального договора купли-продажи</th>
            <th>Код 1С договора залога</th>
            <th>Статус актуального договора залога</th>
            <th>Управление</th>
        `);
    }
}
