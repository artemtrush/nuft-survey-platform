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

    getCompanyForm(company = null) {
        const defaultCompany = {
            PackageId: 0,
            Name: '',
            Code: '',
            Site: '',
            LegalName: '',
            LegalAddress: '',
            Edrpou: '',
            ShortDescription: '',
            Description: '',
            Apis: [
                {
                    Url: '',
                    AccessToken: '',
                    Type: 'loan_contract_receipt',
                    Status: ''
                }
            ],
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

        company = this.form.recursiveFillObject(company, defaultCompany);

        const tabs = [
            {
                Title: 'Основная информация',
                Content: `
                    ${this.component.Input({
                        Id: 'name',
                        Text: 'Название',
                        Value: company.Name
                    })}
                    ${this.component.Input({
                        Id: 'code',
                        Text: 'Код 1С',
                        Value: company.Code
                    })}
                    ${this.component.Select({
                        Id: 'package',
                        Text: 'Пакет',
                        OptionsLoader: async () => {
                            const response = await this.api.package.index();
                            const packages = response.Packages ? response.Packages : [];
                            const options = [];
                            $.each(packages, (idx, pack) => {
                                options.push({
                                    Value: pack.Id,
                                    Text: pack.Name,
                                    Selected: this.math.toInt(pack.Id) === this.math.toInt(company.PackageId)
                                });
                            });
                            return options;
                        }
                    })}
                    ${this.component.Input({
                        Id: 'site',
                        Text: 'Сайт',
                        Value: company.Site
                    })}
                    ${this.component.Input({
                        Id: 'legal_name',
                        Text: 'Юридическое название',
                        Value: company.LegalName
                    })}
                    ${this.component.Input({
                        Id: 'legal_address',
                        Text: 'Юридический адрес',
                        Value: company.LegalAddress
                    })}
                    ${this.component.Input({
                        Id: 'edrpou',
                        Text: 'ЕГРПОУ',
                        Value: company.Edrpou
                    })}
                    ${this.component.FileInput.init({
                        Id: 'logo',
                        Text: 'Логотип',
                        File: company.Logo
                    })}
                `
            },
            {
                Title: 'Описание',
                Content: `
                    ${this.component.Textarea({
                        Id: 'short_description',
                        Text: 'Краткое описание',
                        Value: company.ShortDescription
                    })}
                    ${this.component.Tinymce.html({
                        Id: 'description',
                        Text: 'Описание',
                        Value: company.Description
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
                        Value: company.BankAccounts[0].BankName,
                        NestedLabelFor: 'BankName'
                    })}
                    ${this.component.Input({
                        Id: 'bank_account_account_number',
                        Text: 'Расчётный счёт',
                        Value: company.BankAccounts[0].AccountNumber,
                        NestedLabelFor: 'AccountNumber'
                    })}
                    ${this.component.Input({
                        Id: 'bank_account_mfo',
                        Text: 'Код мфо',
                        Value: company.BankAccounts[0].Mfo,
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
                        Value: company.Signers[0].Name,
                        NestedLabelFor: 'Name'
                    })}
                    ${this.component.Input({
                        Id: 'signer_name_genitive',
                        Text: 'ФИО (Родительный падеж)',
                        Value: company.Signers[0].NameGenitive,
                        NestedLabelFor: 'NameGenitive'
                    })}
                    ${this.component.Input({
                        Id: 'signer_position',
                        Text: 'Должность',
                        Value: company.Signers[0].Position,
                        NestedLabelFor: 'Position'
                    })}
                    ${this.component.Input({
                        Id: 'signer_position_genitive',
                        Text: 'Должность (Родительный падеж)',
                        Value: company.Signers[0].PositionGenitive,
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
            },
            {
                Title: 'API',
                Content: `
                    ${this.component.NestedErrorBlock({ 'Id': 'apis' })}
                    ${this.component.Input({
                        Id: 'api_url',
                        Text: 'Url для получения договоров займа',
                        Value: company.Apis[0].Url,
                        NestedLabelFor: 'Url'
                    })}
                    ${this.component.Input({
                        Id: 'api_access_token',
                        Text: 'Access Token для получения договоров займа',
                        Value: company.Apis[0].AccessToken,
                        NestedLabelFor: 'AccessToken'
                    })}
                    ${this.component.Checkbox({
                        Id: 'api_status',
                        Text: 'Активно',
                        Checked: company.Apis[0].Status == 'active'
                    })}
                    ${this.component.Input({
                        Id: 'api_type',
                        Value: company.Apis[0].Type,
                        Type: 'hidden'
                    })}
                    ${this.component.ActionButton({
                        Id: 'loan_contract_api_test_button',
                        Text: 'Проверить работу API (Настройки должны быть предварительно сохранены)',
                        Action: () => {
                            return this.syncCompanyLoanContracts(company.Id, true);
                        }
                    })}
                    ${this.component.ActionButton({
                        Id: 'loan_contract_api_button',
                        Text: 'Принудительно оновить договора займа (Настройки должны быть предварительно сохранены)',
                        ButtonClass: 'btn-danger',
                        Action: () => {
                            return this.syncCompanyLoanContracts(company.Id, false);
                        }
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

    getCompanyFormParams() {
        const documents = [];
        $.each(this.component.DynamicTable.getItems('documents'), (idx, doc) => {
            const documentParams = this.component.FileInput.getFileParams( doc.FileInputId );
            if (documentParams) {
                documents.push(documentParams);
            }
        });

        const params = {
            PackageId: $('#package').val(),
            Name: $('#name').val(),
            Code: $('#code').val(),
            Site: $('#site').val(),
            LegalName: $('#legal_name').val(),
            LegalAddress: $('#legal_address').val(),
            Edrpou: $('#edrpou').val(),
            ShortDescription: $('#short_description').val(),
            Description: $('#description').val(),
            Apis: [
                {
                    Url: $('#api_url').val(),
                    AccessToken: $('#api_access_token').val(),
                    Type: $('#api_type').val(),
                    Status: $('#api_status').prop('checked') ? 'active' : 'blocked'
                }
            ],
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

    getCompanyFormErrorFields() {
        return {
            PackageId: 'package',
            Name: 'name',
            Code: 'code',
            Site: 'site',
            LegalName: 'legal_name',
            LegalAddress: 'legal_address',
            Edrpou: 'edrpou',
            ShortDescription: 'short_description',
            Description: 'description',
            Apis: 'apis',
            Signers: 'signers',
            BankAccounts: 'bank_accounts',
            Facts: 'facts',
            Logo: 'logo',
            Documents: 'documents'
        };
    }

    async syncCompanyLoanContracts(companyId, testMode) {
        const response = await this.api.loanContract.create({
            CompanyId: companyId,
            TestMode: testMode ? 1 : 0
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
