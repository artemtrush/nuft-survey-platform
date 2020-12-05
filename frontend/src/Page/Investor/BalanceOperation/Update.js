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
            this.redirect(this.pathFor('investor_balance_operation_index', {InvestorId: this.InvestorId}));
        });

        this.bindTypeSelectEvents();
    }

    header() {
        return `Редактирование операции  инвестора #${this.InvestorId}`;
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
        params.InvestorId = this.InvestorId;
        const response = await this.api.investorBalanceOperation.update(this.BalanceOperation.Id, params);

        if (response.Status) {
            this.redirect(this.pathFor('investor_balance_operation_index', {InvestorId: this.InvestorId}));
        } else {
            const formSelector = '#balance_operation_update';
            const errorsFields = this.getBalanceOperationFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
