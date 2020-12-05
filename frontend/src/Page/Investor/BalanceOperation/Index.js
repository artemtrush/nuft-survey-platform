import Base from "./Base";

export default class Index extends Base {
    async init() {
        const columns = [
            {name: 'Id', data: row => row.Id},
            {name: 'Code', data: row => _.escape(row.Code)},
            {
                name: 'CommissionContractId',
                data: row => this.page.linkForEntityShowPage('commission_contract', row.CommissionContractId)
            },
            {name: 'TypeDescription', data: row => _.escape(row.TypeDescription), sortable: false},
            {name: 'Method', data: row => this.form.translateBalanceOperationMethod(row.Method)},
            {name: 'CreatedAt', data: row => this.date.formatDateTime(row.CreatedAt)},
            {name: 'Amount', data: row => _.escape(row.Amount)},
            {name: 'TotalBalance', data: row => _.escape(row.TotalBalance), sortable: false},
            {name: 'TotalPrincipalBalance', data: row => _.escape(row.TotalPrincipalBalance), sortable: false},
            {name: 'TotalInterestBalance', data: row => _.escape(row.TotalInterestBalance), sortable: false}
        ];

        const operationConfig = await this.page.getServerConfigValue('balance_operation');
        columns.push({
            name: 'Status',
            data: row => {
                const allowedStatuses = this.collection.getItemByKey(operationConfig.statuses_transfer, row.Status, []);
                const statusesActions = [];
                allowedStatuses.forEach((status) => {
                    if (status == 'hold' && row.Type != 'withdrawal') {
                        return;
                    }

                    statusesActions.push({
                        Text: `Изменить на "${this.form.translateBalanceOperationStatus(status)}"`,
                        Callback: () => {
                            const question = `
                                Изменить статус операции #${row.Id} на
                                ${this.form.translateBalanceOperationStatus(status)} ?
                            `;
                            this.page.showConfirmModal(question, () => {
                                this.api.investorBalanceOperationStatus.update(row.Id, {
                                    InvestorId: this.InvestorId,
                                    Status: status
                                }).then((response) => {
                                    if (!response.Status) {
                                        const message = this.validator.translateErrorType(response.Error.Type);
                                        this.page.showWarningModal(message);
                                    } else {
                                        this.reload();
                                    }
                                });
                            });
                        }
                    });
                });

                return `
                    <div class="control-buttons-block">
                        <span>${this.form.translateBalanceOperationStatus(row.Status)}</span>
                        ${this.component.DropdownButton({
                            Id: `balance-operation-status-${row.Id}`,
                            Items: statusesActions
                        })}
                    </div>
                `;
            }
        });

        columns.push({
            data: row => {
                const params = {
                    Id: row.Id,
                    InvestorId: this.InvestorId
                };

                return `
                    <div class="control-buttons-block">
                        ${ row.Status != 'canceled' ? `
                            <a
                                type="button"
                                class="btn btn-primary btn-sm"
                                href="${this.pathFor('investor_balance_operation_update', params)}"
                            >
                                <i class="fa fa-edit"></i>
                            </a>
                        ` : '' }
                    </div>
                `;
            },
            sortable: false,
            searchable: false
        });

        const actions = `
            <a
                href="${this.pathFor('investor_balance_operation_create', { InvestorId: this.InvestorId })}"
                class="btn btn-sm btn-primary btn-flat pull-left"
            >
                Добавить операцию
            </a
        `;

        await this.initDataTable({
            columns,
            apiUrl: `investor/${this.InvestorId}/balance_operation`,
            dataColumn: 'BalanceOperations',
            order: [[ 0, "desc" ]],
            actions
        });
    }

    header() {
        return `Список операций инвестора #${this.InvestorId}`;
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Код 1С/ПС</th>
            <th>Договор комиссии</th>
            <th>Тип платежа</th>
            <th>Метод оплаты</th>
            <th>Дата создания</th>
            <th>Сумма, грн</th>
            <th>Итоговый баланс Кошелька, грн</th>
            <th>Итоговый баланс (Тело), грн</th>
            <th>Итоговый баланс (Процент), грн</th>
            <th>Статус</th>
            <th>Управление</th>
        `);
    }
}
