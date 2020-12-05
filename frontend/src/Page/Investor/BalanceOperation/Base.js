import PageBase from "../../Base";

export default class Base extends PageBase {

    bindTypeSelectEvents() {
        $('#type').offon('change', null, function () {
            $('#method').trigger('reloadOptions');

            const contractBlock = $('#commission_contract_id').closest('.form-group');
            if ($(this).val() == 'transfer') {
                contractBlock.show();
            } else {
                contractBlock.hide();
            }
        });
    }

    getBalanceOperationForm(operation = null)    {
        const isUpdate = Boolean(operation);

        if (!operation) {
            operation = {
                Type: '',
                Method: '',
                CommissionContractId: 0,
                Code: '',
                PrincipalAmount: 0,
                InterestAmount: 0,
                IncomeTax: 0,
                MilitaryTax: 0,
                AfterTaxAmount: 0
            };
        }

        return `
            ${this.component.FormErrorBlock()}
            ${this.component.Select({
                Id: 'type',
                Disabled: isUpdate,
                Text: 'Тип операции',
                OptionsLoader: async () => {
                    const config = await this.page.getServerConfigValue('balance_operation');
                    let types = [];
                    if (isUpdate) {
                        types = config.types;
                    } else {
                        types = Object.keys(config.investor.types_methods);
                    }

                    const options = [];
                    $.each(types, (idx, type) => {
                        options.push({
                            Value: type,
                            Text: this.form.translateBalanceOperationType(type),
                            Selected: type == operation.Type
                        });
                    });
                    return options;
                }
            })}
            ${this.component.Select({
                Id: 'method',
                Disabled: isUpdate,
                Text: 'Метод оплаты',
                OptionsLoader: async () => {
                    const config = await this.page.getServerConfigValue('balance_operation');
                    let methods = [];
                    if (isUpdate) {
                        methods = config.methods;
                    } else {
                        const currentType = $('#type').val();
                        const typesMethods = config.investor.types_methods;
                        methods = currentType in typesMethods ? typesMethods[ currentType ] : [];
                    }

                    const options = [];
                    $.each(methods, (idx, method) => {
                        options.push({
                            Value: method,
                            Text: this.form.translateBalanceOperationMethod(method),
                            Selected: method == operation.Method
                        });
                    });
                    return options;
                }
            })}
            ${this.component.Select({
                Id: 'commission_contract_id',
                Disabled: isUpdate,
                Text: 'Договор комиссии',
                OptionsLoader: async () => {
                    const response = await this.api.investorCommissionContract.index({ InvestorId: this.InvestorId });
                    const contracts = response.CommissionContracts ? response.CommissionContracts : [];
                    const options = [{
                        Value: 0,
                        Text: ''
                    }];

                    $.each(contracts, (idx, contract) => {
                        options.push({
                            Value: contract.Id,
                            Text: contract.Code + ' (Id: ' + contract.Id + ')',
                            Selected: contract.Id == operation.CommissionContractId
                        });
                    });
                    return options;
                }
            })}
            ${this.component.Input({
                Id: 'code',
                Text: 'Код 1С/ПС',
                Value: operation.Code
            })}
            ${this.component.Input({
                Id: 'principal_amount',
                Type: 'number',
                Tags: 'step="0.01"',
                Text: 'Сумма операции (Тело), грн',
                Value: operation.PrincipalAmount
            })}
            ${this.component.Input({
                Id: 'interest_amount',
                Type: 'number',
                Tags: 'step="0.01"',
                Text: 'Сумма операции (Процент), грн',
                Value: operation.InterestAmount
            })}
            ${isUpdate ? this.component.InformationTable({
                Title: 'Дополнительная информация по операции',
                Header: ['Поле', 'Значение'],
                Rows: [
                    ['Сумма налога "НДФЛ"', operation.IncomeTax],
                    ['Сумма налога "Военный сбор"', operation.MilitaryTax],
                    ['Сумма операции с вычетом налогов', operation.AfterTaxAmount]
                ]
            }) : ''}
            ${isUpdate && operation.BankAccount ? this.component.InformationTable({
                Title: 'Реквизиты операции',
                Header: ['Поле', 'Значение'],
                Rows: [
                    ['Название банка', operation.BankAccount.BankName],
                    ['Расчётный счёт', operation.BankAccount.AccountNumber],
                    ['Код мфо', operation.BankAccount.Mfo]
                ]
            }) : ''}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getBalanceOperationFormParams()    {
        const params = {
            Type: $('#type').val(),
            Method: $('#method').val(),
            CommissionContractId: $('#commission_contract_id').val(),
            Code: $('#code').val(),
            PrincipalAmount: $('#principal_amount').val(),
            InterestAmount: $('#interest_amount').val()
        };

        if (!this.math.toInt(params.CommissionContractId)) {
            delete params.CommissionContractId;
        }

        return params;
    }

    getBalanceOperationFormErrorFields()    {
        return {
            Type: 'type',
            Method: 'method',
            CommissionContractId: 'commission_contract_id',
            Code: 'code',
            PrincipalAmount: 'principal_amount',
            InterestAmount: 'interest_amount'
        };
    }
}
