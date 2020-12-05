import Base from "../Base";

export default class Show extends Base {
    header() {
        return 'Страница договора комиссии';
    }

    content() {
        const contract = this.CommissionContract;

        return `
            <div class="info-page-container">
                ${this.component.InformationTable({
                    Title: 'Договор комиссии #' + contract.Id,
                    Header: ['Поле', 'Значение'],
                    Rows: [
                        ['Идентификатор в системе', contract.Id],
                        ['Код 1С', contract.Code],
                        ['Идентификатор клиента', contract.Investor.Id],
                        ['ФИО клиента', [
                            contract.Investor.User.SecondName,
                            contract.Investor.User.FirstName,
                            contract.Investor.User.MiddleName
                        ].join(' ')],
                        ['Идентификатор МФО', contract.Company.Id],
                        ['Название МФО', contract.Company.Name],
                        ['Дата создания договора клиентом', this.date.formatDate(contract.CreatedAt)],
                        ['Дата оформления', this.date.formatDate(contract.AgreementDate)],
                        ['Дата окончания', this.date.formatDate(contract.ExpirationDate)],
                        ['Дней до окончания', this.date.getDatesDiffInDays(
                            contract.ExpirationDate,
                            this.date.currentDate()
                        )],
                        ['Цена сделки', contract.Amount],
                        ['Сумма денежного обязательства (всего)', contract.ObligationAmount],
                        ['Сумма дохода клиента', contract.IncomeAmount],
                        ['Сумма комиссионного вознаграждения', contract.CommissionAmount],
                        ['Процент годовых по договору', this.math.toDecimal(
                            this.math.toFloat(contract.FinalAnnumPercent) +
                            this.math.toFloat(contract.CommissionPercent)
                        )],
                        ['Процент годовых (Клиент)', contract.AnnumPercent],
                        ['Процент за пролонгацию', contract.ProlongationPercent],
                        ['Процент комиссии', this.math.toDecimal(contract.CommissionPercent)],
                        ['Статус договора в системе', this.form.translateCommissionContractStatus(contract.Status)],
                        ['Файл договора', this.component.ActionButton({
                            'Id': 'contract-file',
                            'Text': 'Скачать',
                            'Action': async () => {
                                const res = await this.api.commissionContractFile.show(contract.Id);
                                this.file.readFileStream(res);
                            }
                        })]
                    ]
                })}
            </div>
        `;
    }
}
