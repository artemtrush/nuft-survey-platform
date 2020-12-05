import PageBase from "../Base";

export default class Base extends PageBase {
    insertFactRow = this.component.DynamicTable.getAddRowFunction({
        TableId: 'facts',
        DataFields: [
            {
                Name: 'Title',
                Generator: (value) => {
                    return `<input type="text" class="form-control" value="${value}">`;
                }
            },
            {
                Name: 'Description',
                Generator: (value) => {
                    return `<textarea class="form-control" rows="3" style="resize: vertical">${value}</textarea>`;
                }
            },
            {
                Name: 'Hint',
                Generator: (value) => {
                    return `<textarea class="form-control" rows="3" style="resize: vertical">${value}</textarea>`;
                }
            }
        ]
    });

    documentCounter = 0
    insertDocumentRow = this.component.DynamicTable.getAddRowFunction({
        TableId: 'documents',
        DataFields: [
            {
                Name: 'FileInputId',
                Generator: (value) => {
                    this.documentCounter += 1;
                    const documentFileInputId = `document-${this.documentCounter}`;

                    return `
                        <input type="hidden" value="${documentFileInputId}">
                        ${this.component.FileInput.init({
                            Id: documentFileInputId,
                            File: value
                        })}
                    `;
                }
            }
        ]
    });

    getCommissionerForm(commissioner = null) {
        const defaultCommissioner = {
            Name: '',
            Code: '',
            Site: '',
            LegalName: '',
            LegalAddress: '',
            Edrpou: '',
            ShortDescription: '',
            Description: '',
            Signers: [
                {
                    Name: '',
                    NameGenitive: '',
                    Position: '',
                    PositionGenitive: ''
                }
            ],
            BankAccounts: [
                {
                    BankName: '',
                    AccountNumber: '',
                    Mfo: ''
                }
            ],
            Logo: {}
        };

        commissioner = this.form.recursiveFillObject(commissioner, defaultCommissioner);

        const tabs = [
            {
                Title: 'Основная информация',
                Content: `
                    ${this.component.Input({
                        Id: 'name',
                        Text: 'Название',
                        Value: commissioner.Name
                    })}
                    ${this.component.Input({
                        Id: 'code',
                        Text: 'Код 1С',
                        Value: commissioner.Code
                    })}
                    ${this.component.Input({
                        Id: 'site',
                        Text: 'Сайт',
                        Value: commissioner.Site
                    })}
                    ${this.component.Input({
                        Id: 'legal_name',
                        Text: 'Юридическое название',
                        Value: commissioner.LegalName
                    })}
                    ${this.component.Input({
                        Id: 'legal_address',
                        Text: 'Юридический адрес',
                        Value: commissioner.LegalAddress
                    })}
                    ${this.component.Input({
                        Id: 'edrpou',
                        Text: 'ЕГРПОУ',
                        Value: commissioner.Edrpou
                    })}
                    ${this.component.FileInput.init({
                        Id: 'logo',
                        Text: 'Логотип',
                        File: commissioner.Logo
                    })}
                `
            },
            {
                Title: 'Описание',
                Content: `
                    ${this.component.Textarea({
                        Id: 'short_description',
                        Text: 'Краткое описание',
                        Value: commissioner.ShortDescription
                    })}
                    ${this.component.Tinymce.html({
                        Id: 'description',
                        Text: 'Описание',
                        Value: commissioner.Description
                    })}
                `
            },
            {
                Title: 'Дополнительные параметры',
                Content: `
                    ${this.component.DynamicTable.getTable({
                        Id: 'facts',
                        AddBtnText: 'Добавить параметр',
                        AddBtnCallback: this.insertFactRow,
                        Headers: [
                            { Text: 'Название', NestedLabelFor: 'Title' },
                            { Text: 'Описание', NestedLabelFor: 'Description' },
                            { Text: 'Подсказка', NestedLabelFor: 'Hint' }
                        ]
                    })}
                `
            },
            {
                Title: 'Реквизиты',
                Content: `
                    ${this.component.NestedErrorBlock({ 'Id': 'bank_accounts' })}
                    ${this.component.Input({
                        Id: 'bank_account_bank_name',
                        Text: 'Название банка',
                        Value: commissioner.BankAccounts[0].BankName,
                        NestedLabelFor: 'BankName'
                    })}
                    ${this.component.Input({
                        Id: 'bank_account_account_number',
                        Text: 'Расчётный счёт',
                        Value: commissioner.BankAccounts[0].AccountNumber,
                        NestedLabelFor: 'AccountNumber'
                    })}
                    ${this.component.Input({
                        Id: 'bank_account_mfo',
                        Text: 'Код мфо',
                        Value: commissioner.BankAccounts[0].Mfo,
                        NestedLabelFor: 'Mfo'
                    })}
                `
            },
            {
                Title: 'Подписант',
                Content: `
                    ${this.component.NestedErrorBlock({ 'Id': 'signers' })}
                    ${this.component.Input({
                        Id: 'signer_name',
                        Text: 'ФИО',
                        Value: commissioner.Signers[0].Name,
                        NestedLabelFor: 'Name'
                    })}
                    ${this.component.Input({
                        Id: 'signer_name_genitive',
                        Text: 'ФИО (Родительный падеж)',
                        Value: commissioner.Signers[0].NameGenitive,
                        NestedLabelFor: 'NameGenitive'
                    })}
                    ${this.component.Input({
                        Id: 'signer_position',
                        Text: 'Должность',
                        Value: commissioner.Signers[0].Position,
                        NestedLabelFor: 'Position'
                    })}
                    ${this.component.Input({
                        Id: 'signer_position_genitive',
                        Text: 'Должность (Родительный падеж)',
                        Value: commissioner.Signers[0].PositionGenitive,
                        NestedLabelFor: 'PositionGenitive'
                    })}
                `
            },
            {
                Title: 'Документы',
                Content: `
                    ${this.component.DynamicTable.getTable({
                        Id: 'documents',
                        AddBtnText: 'Добавить документ',
                        AddBtnCallback: this.insertDocumentRow,
                        Headers: [
                            { Text: 'Документ' }
                        ]
                    })}
                `
            }
        ];

        return `
            ${this.component.FormErrorBlock()}
            ${this.component.NavigationTabs(tabs)}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getCommissionerFormParams() {
        const documents = [];
        $.each(this.component.DynamicTable.getItems('documents'), (idx, doc) => {
            const documentParams = this.component.FileInput.getFileParams( doc.FileInputId );
            if (documentParams) {
                documents.push(documentParams);
            }
        });

        const params = {
            Name: $('#name').val(),
            Code: $('#code').val(),
            Site: $('#site').val(),
            LegalName: $('#legal_name').val(),
            LegalAddress: $('#legal_address').val(),
            Edrpou: $('#edrpou').val(),
            ShortDescription: $('#short_description').val(),
            Description: $('#description').val(),
            Signers: [
                {
                    Name: $('#signer_name').val(),
                    NameGenitive: $('#signer_name_genitive').val(),
                    Position: $('#signer_position').val(),
                    PositionGenitive: $('#signer_position_genitive').val()
                }
            ],
            BankAccounts: [
                {
                    BankName: $('#bank_account_bank_name').val(),
                    AccountNumber: $('#bank_account_account_number').val(),
                    Mfo: $('#bank_account_mfo').val()
                }
            ],
            Facts: this.component.DynamicTable.getItems('facts'),
            Logo: this.component.FileInput.getFileParams('logo'),
            Documents: documents
        };

        return params;
    }

    getCommissionerFormErrorFields() {
        return {
            Name: 'name',
            Code: 'code',
            Site: 'site',
            LegalName: 'legal_name',
            LegalAddress: 'legal_address',
            Edrpou: 'edrpou',
            ShortDescription: 'short_description',
            Description: 'description',
            Signers: 'signers',
            BankAccounts: 'bank_accounts',
            Facts: 'facts',
            Logo: 'logo',
            Documents: 'documents'
        };
    }

    async testLoanContractApi(params) {
        const response = await this.api.loanContract.create({
            CommissionerId: params.Commissioner.Id,
            TestMode: 1
        });

        if (response.Status) {
            return {
                Status: 1,
                Header: 'Успешно!'
            };
        } else {
            const error = response.Error ? response.Error : {};

            return {
                Status: 0,
                Header: 'Ошибка' + (error.Type ? ': ' + this.validator.translateErrorType(error.Type) : ''),
                Body: error.Message ? error.Message : ''
            };
        }
    }
}
