import Base from "../Base";

export default class Show extends Base {
    header() {
        return 'Страница договора займа';
    }

    content() {
        const contract = this.LoanContract;

        const relationsRows = [];
        $.each(contract.SaleContractsRelations, (saleContractId, saleContractRelations) => {
            const commissionContractsLinks = [];
            $.each(saleContractRelations, (idx, relation) => {
                commissionContractsLinks.push(this.page.linkForEntityShowPage(
                    'commission_contract',
                    relation.CommissionContractId,
                    '(Сумма: ' + relation.CoverageAmount + ')'
                ));
            });

            relationsRows.push([
                this.page.linkForEntityShowPage('sale_contract', saleContractId),
                commissionContractsLinks.join('<br/>')
            ]);
        });

        return `
            <div class="info-page-container">
                ${this.component.InformationTable({
                    Title: 'Договор займа #' + contract.Id,
                    Header: ['Поле', 'Значение'],
                    Rows: [
                        ['Идентификатор в системе', contract.Id],
                        ['Внешний идентификатор', contract.ExternalId],
                        ['ФИО заемщика', [
                            contract.BorrowerSecondName,
                            contract.BorrowerFirstName,
                            contract.BorrowerMiddleName
                        ].join(' ')],
                        ['Дата оформления', this.date.formatDate(contract.AgreementDate)],
                        ['Дата окончания', this.date.formatDate(contract.ExpirationDate)],
                        ['Дней до окончания', this.date.getDatesDiffInDays(
                            contract.ExpirationDate,
                            this.date.currentDate()
                        )],
                        ['Сумма договора при оформлении', contract.Amount],
                        ['Сумма остатка тела', contract.ResidualAmount],
                        ['Дней просрочки', contract.LateDays],
                        ['Тип заемщика', this.form.translateLoanContractBorrowerType(contract.BorrowerType)]
                    ]
                })}
                ${this.component.InformationTable({
                    Title: 'Связанные договора',
                    Header: ['Договор купли-продажи/залога', 'Договор комиссии'],
                    Rows: relationsRows
                })}
            </div>
        `;
    }
}
