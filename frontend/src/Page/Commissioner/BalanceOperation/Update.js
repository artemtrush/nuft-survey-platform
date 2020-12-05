import Base from "./Base";

export default class Update extends Base {
    async bindEvents() {
        const $form = $('form#balance_operation_update');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.updateBalanceOperation();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('commissioner_balance_operation_index', {CommissionerId: this.CommissionerId}));
        });

        this.bindTypeSelectEvents();
    }

    header() {
        return `Редактирование операции комиссионера #${this.CommissionerId}`;
    }

    content() {
        return `
            <form id="balance_operation_update">
                ${this.getBalanceOperationForm(this.BalanceOperation)}
            </form>
        `;
    }

    async updateBalanceOperation() {
        const params = this.getBalanceOperationFormParams();
        params.CommissionerId = this.CommissionerId;
        const response = await this.api.commissionerBalanceOperation.update(this.BalanceOperation.Id, params);

        if (response.Status) {
            this.redirect(this.pathFor('commissioner_balance_operation_index', {CommissionerId: this.CommissionerId}));
        } else {
            const formSelector = '#balance_operation_update';
            const errorsFields = this.getBalanceOperationFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
