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
            {
                name: 'SaleContractId',
                data: row => this.page.linkForEntityShowPage('sale_contract', row.SaleContractId)
            },
            {
                name: 'CompanyId',
                data: row => this.page.linkForEntityShowPage('company', row.CompanyId)
            },
            {name: 'TypeDescription', data: row => _.escape(row.TypeDescription), sortable: false},
            {name: 'Method', data: row => this.form.translateBalanceOperationMethod(row.Method)},
            {name: 'CreatedAt', data: row => this.date.formatDateTime(row.CreatedAt)},
            {name: 'Amount', data: row => _.escape(row.Amount)},
            {name: 'TotalBalance', data: row => _.escape(row.TotalBalance), sortable: false}
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
                                this.api.commissionerBalanceOperationStatus.update(row.Id, {
                                    CommissionerId: this.CommissionerId,
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
                    CommissionerId: this.CommissionerId
                };

                return `
                    <div class="control-buttons-block">
                        ${ row.Status != 'canceled' ? `
                            <a
                                type="button"
                                class="btn btn-primary btn-sm"
                                href="${this.pathFor('commissioner_balance_operation_update', params)}"
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
                href="${this.pathFor('commissioner_balance_operation_create', { CommissionerId: this.CommissionerId })}"
                class="btn btn-sm btn-primary btn-flat pull-left"
            >
                Добавить операцию
            </a
        `;

        await this.initDataTable({
            columns,
            apiUrl: `commissioner/${this.CommissionerId}/balance_operation`,
            dataColumn: 'BalanceOperations',
            order: [[ 0, "desc" ]],
            actions
        });
    }

    header() {
        return `Список операций комиссионера #${this.CommissionerId}`;
    }

    content() {
        return this.getDataTableTemplate(`
            <th>Id</th>
            <th>Код 1С/ПС</th>
            <th>Договор комиссии</th>
            <th>Договор купли-продажи</th>
            <th>Контрагент</th>
            <th>Тип платежа</th>
            <th>Метод оплаты</th>
            <th>Дата создания</th>
            <th>Сумма, грн</th>
            <th>Итоговый баланс, грн</th>
            <th>Статус</th>
            <th>Управление</th>
        `);
    }
}
