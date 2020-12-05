import PageBase from "../../Base";

export default class Base extends PageBase {

    bindTypeSelectEvents() {
        $('#type').offon('change', null, function () {
            $('#method').trigger('reloadOptions');

            const commissionContractBlock = $('#commission_contract_id').closest('.form-group');
            const saleContractBlock = $('#sale_contract_id').closest('.form-group');
            if ($(this).val() == 'transfer') {
                commissionContractBlock.show();
                saleContractBlock.hide();
            } else {
                commissionContractBlock.hide();
                saleContractBlock.show();
            }
        });
    }

    getBalanceOperationForm(operation = null)    {
        const isUpdate = Boolean(operation);

        if (!operation) {
            operation = {
                Type: '',
                Method: '',
                Code: '',
                Amount: 0,
                CommissionContractId: 0,
                SaleContractId: 0
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
                        types = Object.keys(config.commissioner.types_methods);
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
                    const config =  await this.page.getServerConfigValue('balance_operation');
                    let methods = [];
                    if (isUpdate) {
                        methods = config.methods;
                    } else {
                        const currentType = $('#type').val();
                        const typesMethods = config.commissioner.types_methods;
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
                    const response = await this.api.commissionerCommissionContract.index({
                        CommissionerId: this.CommissionerId
                    });
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
            ${this.component.Select({
                Id: 'sale_contract_id',
                Disabled: isUpdate,
                Text: 'Договор купли-продажи',
                OptionsLoader: async () => {
                    const response = await this.api.commissionerSaleContract.index({
                        CommissionerId: this.CommissionerId
                    });
                    const contracts = response.SaleContracts ? response.SaleContracts : [];
                    const options = [{
                        Value: 0,
                        Text: ''
                    }];

                    $.each(contracts, (idx, contract) => {
                        options.push({
                            Value: contract.Id,
                            Text: contract.Code + ' (Id: ' + contract.Id + ')',
                            Selected: contract.Id == operation.SaleContractId
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
                Id: 'amount',
                Type: 'number',
                Tags: 'step="0.01"',
                Text: 'Сумма операции, грн',
                Value: operation.Amount
            })}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getBalanceOperationFormParams()    {
        const params = {
            Type: $('#type').val(),
            Method: $('#method').val(),
            CommissionContractId: $('#commission_contract_id').val(),
            SaleContractId: $('#sale_contract_id').val(),
            Code: $('#code').val(),
            Amount: $('#amount').val()
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
            SaleContractId: 'sale_contract_id',
            Code: 'code',
            Amount: 'amount'
        };
    }
}
