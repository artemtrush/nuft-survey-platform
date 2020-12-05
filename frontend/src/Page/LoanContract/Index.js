import Base from "../Base";

export default class Index extends Base {

    async init() {
        const columns = [
            {name: 'CompanyId', data: row => this.page.linkForEntityShowPage('company', row.CompanyId)},
            {name: 'Id', data: row => row.Id},
            {name: 'ExternalId', data: row => row.ExternalId},
            {name: 'BorrowerType', data: row => this.form.translateLoanContractBorrowerType(row.BorrowerType)},
            {name: 'ResidualAmount', data: row => row.ResidualAmount},
            {name: 'AvailableAmount', data: row => row.AvailableAmount},
            {name: 'LeftDays', data: row => this.math.notLessThanZero(row.LeftDays)},
            {name: 'LateDays', data: row => row.LateDays},
            {
                name: 'CommissionContractsCount',
                data: row => row.CommissionContractsCount,
                sortable: false
            },
            {
                name: 'IsValidForFirstGeneration',
                data: row => row.IsValidForFirstGeneration ? 'Да' : 'Нет',
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
                            href="${this.pathFor('loan_contract_show', params)}"
                        >
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                `;
            },
            sortable: false
        });

        await this.initDataTable({
            columns,
            apiUrl: 'loan_contract',
            dataColumn: 'LoanContracts',
            order: [[ 1, "desc" ]]
        });
    }

    header() {
        return 'Список договоров займа';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>МФО</th>
            <th>Id договора займа</th>
            <th>Внешний Id договора займа</th>
            <th>Тип заемщика</th>
            <th>Сумма остатка тела</th>
            <th>Доступная сумма для КП и ДЗ</th>
            <th>Дней до окончания договора займа</th>
            <th>Дней просрочки договора займа</th>
            <th>Количество договоров комиссии</th>
            <th width="20px;">Может использоваться для генерации</th>
            <th>Управление</th>
        `);
    }
}
