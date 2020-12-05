import PageBase from "../Base";

export default class Base extends PageBase {

    getPackageForm(pack = null)    {
        if (!pack) {
            pack = {
                Name: ''
            };
        }

        return `
            ${this.component.FormErrorBlock()}
            ${this.component.Input({
                Id: 'name',
                Text: 'Название',
                Value: pack.Name
            })}
            ${this.component.DynamicTable.getTable({
                Id: 'terms',
                Text: 'Условия',
                AddBtnText: 'Добавить условие',
                AddBtnCallback: this.insertTermRow,
                Headers: [
                    { Text: 'Срок от, мес', NestedLabelFor: 'PeriodInMonthsFrom' },
                    { Text: 'Срок до, мес', NestedLabelFor: 'PeriodInMonthsTo' },
                    { Text: 'Сумма от, грн', NestedLabelFor: 'AmountFrom' },
                    { Text: 'Сумма до, грн', NestedLabelFor: 'AmountTo' },
                    { Text: '% годовых', NestedLabelFor: 'AnnumPercent' },
                    { Text: '% за пролонгацию', NestedLabelFor: 'ProlongationPercent' },
                    { Text: '% комиссии', NestedLabelFor: 'CommissionPercent' }
                ]
            })}
            ${this.component.FormSubmitBlock()}
        `;
    }

    insertTermRow = this.component.DynamicTable.getAddRowFunction({
        TableId: 'terms',
        DataFields: [
            {
                Name: 'PeriodInMonthsFrom',
                Generator: (value) => {
                    return `<input type="number" class="form-control" data-type="integer" value="${value}">`;
                }
            },
            {
                Name: 'PeriodInMonthsTo',
                Generator: (value) => {
                    return `<input type="number" class="form-control" data-type="integer" value="${value}">`;
                }
            },
            {
                Name: 'AmountFrom',
                Generator: (value) => {
                    return `<input type="number" class="form-control" data-type="integer" value="${value}">`;
                }
            },
            {
                Name: 'AmountTo',
                Generator: (value) => {
                    return `<input type="number" class="form-control" data-type="integer" value="${value}">`;
                }
            },
            {
                Name: 'AnnumPercent',
                Generator: (value) => {
                    return `
                        <input type="number" step="0.01" class="form-control" data-type="decimal" value="${value}">
                    `;
                }
            },
            {
                Name: 'ProlongationPercent',
                Generator: (value) => {
                    return `
                        <input type="number" step="0.01" class="form-control" data-type="decimal" value="${value}">
                    `;
                }
            },
            {
                Name: 'CommissionPercent',
                Generator: (value) => {
                    return `
                        <input type="number" step="0.01" class="form-control" data-type="decimal" value="${value}">
                    `;
                }
            }
        ]
    });

    getPackageFormParams()    {
        const params = {
            Name: $('#name').val(),
            Terms: this.component.DynamicTable.getItems('terms', (propName, $field) => {
                let propValue = $field.val();
                const propType = $field.attr('data-type');

                if (propType == 'integer') {
                    propValue = this.math.toInt(propValue);
                } else if (propType == 'decimal') {
                    propValue = this.math.toDecimal(propValue);
                }

                return propValue;
            })
        };

        return params;
    }

    getPackageFormErrorFields()    {
        return {
            Name: 'name',
            Terms: 'terms'
        };
    }
}
