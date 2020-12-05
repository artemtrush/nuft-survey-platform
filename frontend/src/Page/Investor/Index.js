import Base from "../Base";

export default class Index extends Base {
    async init() {
        const actionColumn = {
            name: `Edit`,
            data: row => {
                const params = {
                    InvestorId: row.Id
                };

                return `
                    <div class="control-buttons-block">
                        <a
                            type="button"
                            class="btn btn-success btn-sm"
                            href="${this.pathFor('investor_balance_operation_index', params)}"
                        >
                            <i class="fa fa-money"></i>
                        </a>
                    </div>
                `;
            },
            sortable: false
        };

        const investorConfig = await this.page.getServerConfigValue('investor');
        const statusColumn = {
            name: `Status`,
            data: row => {
                const allowedStatuses = this.collection.getItemByKey(investorConfig.statuses_transfer, row.Status, []);
                const statusesActions = [];
                allowedStatuses.forEach((status) => {
                    statusesActions.push({
                        Text: `Изменить на "${this.form.translateInvestorStatus(status)}"`,
                        Callback: () => {
                            const question = `
                                Изменить статус клиента #${row.Id} на ${this.form.translateInvestorStatus(status)} ?
                            `;
                            this.page.showConfirmModal(question, () => {
                                this.api.investorStatus.update(row.Id, { Status: status }).then((response) => {
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
                        <span>${this.form.translateInvestorStatus(row.Status)}</span>
                        ${this.component.DropdownButton({
                            Id: `status-actions-${row.Id}`,
                            Items: statusesActions
                        })}
                    </div>
                `;
            }
        };

        const columns = [
            {name: 'Id', data: row => _.escape(row.Id)},
            actionColumn,
            statusColumn,
            {name: 'TotalBalance', data: row => _.escape(row.TotalBalance)},
            {
                name: 'HasCommissionContracts',
                data: row => row.CommissionContractsCount >= 1 ? "Да" : "Нет",
                sortable: false
            },
            {name: 'Code', data: row => _.escape(row.Code)},
            {
                name: 'FullName',
                data: row => _.escape([
                    row.SecondName,
                    row.FirstName,
                    row.MiddleName
                ].join(' '))
            },
            {name: 'TaxNumber', data: row => _.escape(row.TaxNumber), sortable: false},
            {name: 'Phone', data: row => _.escape(row.Phone), sortable: false},
            {name: 'Email', data: row => _.escape(row.Email), sortable: false},
            {name: 'BirthDate', data: row => _.escape(row.BirthDate)},
            {name: 'Address', data: row => _.escape(row.Address), sortable: false},
            {
                name: 'Passport',
                data: row => {
                    if (!row.PassportSeries) {
                        return '';
                    }

                    return (
                        _.escape(row.PassportSeries) + ' ' +
                        _.escape(row.PassportNumber) + ', выдан ' +
                        _.escape(row.PassportIssueDate) + ', ' +
                        _.escape(row.PassportIssuedBy)
                    );
                },
                sortable: false
            },
            {
                name: 'IdCard',
                data: row => {
                    if (!row.IdCardRecordNumber) {
                        return '';
                    }

                    return (
                        'Запись: ' +
                        _.escape(row.IdCardRecordNumber) + ', документ: ' +
                        _.escape(row.IdCardDocumentNumber) + ', выдан ' +
                        _.escape(row.IdCardIssueDate) + ', ' +
                        _.escape(row.IdCardIssuedBy)
                    );
                },
                sortable: false
            },
            {name: 'AccountNumber', data: row => _.escape(row.AccountNumber), sortable: false},
            {name: 'BankName', data: row => _.escape(row.BankName), sortable: false},
            {name: 'CreatedAt', data: row => this.date.formatDate(row.CreatedAt), sortable: false},
            {name: 'BlockDate', data: row => this.date.formatDate(row.StatusHistory.BlockDate), sortable: false},
            {name: 'UnblockDate', data: row => this.date.formatDate(row.StatusHistory.UnblockDate), sortable: false},
            {name: 'DeleteDate', data: row => this.date.formatDate(row.StatusHistory.DeleteDate), sortable: false},
            {name: 'Comment', data: row => _.escape(row.StatusHistory.Comment), sortable: false}
        ];

        const wideTables = [...Array(columns.length - 1).keys()].map(idx => ++idx);

        const statuses = {};
        $.each(investorConfig.statuses, ( idx, value ) => {
            statuses[ value ] = this.form.translateInvestorStatus(value);
        });

        await this.initDataTable({
            columns,
            apiUrl: 'investor',
            dataColumn: 'Investors',
            order: [[ 0, "asc" ]],
            actions: ' ',
            scrollX: true,
            scrollCollapse: true,
            columnDefs: [
                { 'targets': wideTables }
            ],
            filterColumns : {
                'Status': statuses
            }
        });

        setTimeout(() => {
            const table = $('div.dataTables_scrollBody');
            table.append('<div style="height:60px"></div>');
        }, 500);
    }

    header() {
        return 'Список клиентов';
    }

    content() {
        return this.getDataTableTemplate(`
            <th>ID</th>
            <th>Управление</th>
            <th>Статус</th>
            <th>Итоговый баланс Кошелька (грн)</th>
            <th>Договора комиссии</th>
            <th>Код 1С</th>
            <th>ФИО</th>
            <th>ИНН</th>
            <th>Телефон</th>
            <th>E-mail</th>
            <th>Дата рождения</th>
            <th>Место проживания</th>
            <th>Паспорт</th>
            <th>ID-карта</th>
            <th>Счет</th>
            <th>Название банка</th>
            <th>Дата регистрации</th>
            <th>Дата блокировки</th>
            <th>Дата разблокировки</th>
            <th>Дата удаления</th>
            <th>Комментарий</th>
        `);
    }
}
