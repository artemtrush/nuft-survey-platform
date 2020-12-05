import Base from "../Base";

export default class Show extends Base {
    header() {
        return 'Страница договора купли-продажи';
    }

    content() {
        const self = this;

        const saleContract = this.SaleContract;
        const pledgeContract = this.SaleContract.PledgeContract;

        function getContractLink(contract) {
            const contractHint = contract.ConfirmedByUserEmail ?
                `Подтвержден пользователем ${contract.ConfirmedByUserEmail}` : ``;

            return `
                <div style="display:flex;align-items:flex-start;">
                    ${self.component.ActionButton({
                        'Id': `contract-file-${contract.Id}`,
                        'Text': `${contract.Code} (${contract.Id})`,
                        'Action': async () => {
                            const res = await self.api.saleContractFile.show(contract.Id);
                            self.file.readFileStream(res);
                        }
                    })}
                    ${self.component.SaleContractStatusSelect({
                        ContractId: contract.Id,
                        CurrentStatus: contract.Status,
                        Hint: contractHint
                    })}
                </div>
            `;
        }

        function addContractToRows(rows, contract) {
            const date = self.date.formatDate(contract.AgreementDate);
            if (!(date in rows)) {
                rows[ date ] = [date, '', ''];
            }
            const colIdx = contract.Type == 'main' ? 1 : 2;
            rows[ date ][ colIdx ] += getContractLink(contract);

            const sortedRows = {};
            Object.keys(rows).sort().forEach(key => {
                sortedRows[ key ] = rows[ key ];
            });

            return sortedRows;
        }

        let baseRows = {};
        baseRows = addContractToRows(baseRows, saleContract);
        baseRows = addContractToRows(baseRows, saleContract.PledgeContract);

        let additionalRows = {};
        $.each(saleContract.AdditionalContracts, (contractId, contract) => {
            additionalRows = addContractToRows(additionalRows, contract);
        });
        $.each(saleContract.PledgeContract.AdditionalContracts, (contractId, contract) => {
            additionalRows = addContractToRows(additionalRows, contract);
        });

        return `
            <div class="info-page-container">
                ${this.component.InformationTable({
                    Title: 'Информация о основном договоре купли-продажи',
                    Header: ['Поле', 'Значение'],
                    Rows: [
                        ['Идентификатор', saleContract.Id],
                        ['Идентификатор МФО', saleContract.CompanyId],
                        ['Код 1С', saleContract.Code],
                        ['Цена права требования', saleContract.Amount],
                        ['Размер права требования', saleContract.ObligationAmount],
                        ['Операционная дата', this.date.formatDate(saleContract.OperationDate)],
                        ['Дата оформления', this.date.formatDate(saleContract.AgreementDate)],
                        ['Дата окончания', this.date.formatDate(saleContract.ExpirationDate)],
                        ['Дней до окончания', this.date.getDatesDiffInDays(
                            saleContract.ExpirationDate,
                            this.date.currentDate()
                        )]
                    ]
                })}
                ${this.component.InformationTable({
                    Title: 'Информация о основном договоре залога',
                    Header: ['Поле', 'Значение'],
                    Rows: [
                        ['Идентификатор', pledgeContract.Id],
                        ['Идентификатор МФО', pledgeContract.CompanyId],
                        ['Код 1С', pledgeContract.Code],
                        ['Залоговая стоимость', pledgeContract.Amount],
                        ['Операционная дата', this.date.formatDate(pledgeContract.OperationDate)],
                        ['Дата оформления', this.date.formatDate(pledgeContract.AgreementDate)],
                        ['Дата окончания', this.date.formatDate(pledgeContract.ExpirationDate)],
                        ['Дней до окончания', this.date.getDatesDiffInDays(
                            pledgeContract.ExpirationDate,
                            this.date.currentDate()
                        )]
                    ]
                })}
                ${this.component.InformationTable({
                    Title: 'Основные договора',
                    Header: ['Дата создания', 'Договор купли-продажи', 'Договор залога'],
                    Rows: Object.values(baseRows),
                    AutoWidth: true
                })}
                ${this.component.InformationTable({
                    Title: 'Дополнительные соглашения',
                    Header: ['Дата создания', 'Договор купли-продажи', 'Договор залога'],
                    Rows: Object.values(additionalRows),
                    AutoWidth: true
                })}
                ${this.component.ActionButton({
                    Id: 'sale_contract_generation_button',
                    Text: 'Принудительно запустить генерацию договора',
                    ButtonClass: 'btn-danger',
                    Action: async () => {
                        const response = await this.api.saleContract.update(saleContract.Id);

                        if (response.Status) {
                            this.reload();
                        } else {
                            const error = response.Error ? response.Error : {};
                            return {
                                Status: 0,
                                Header: 'Ошибка',
                                Body: error.Message ? error.Message : ''
                            };
                        }
                    }
                })}
            </div>
        `;
    }
}
