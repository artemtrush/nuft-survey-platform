import Base from "./Base";

export default class Create extends Base {
    async bindEvents() {
        const $form = $('form#balance_operation_create');

        $form.offon('submit', null, e => {
            e.preventDefault();
            this.createBalanceOperation();
        });

        $form.offon('reset', null, e => {
            e.preventDefault();
            this.redirect(this.pathFor('investor_balance_operation_index', {InvestorId: this.InvestorId}));
        });

        this.bindTypeSelectEvents();
    }

    header() {
        return `Новая операция инвестора #${this.InvestorId}`;
    }

    content() {
        return `
            <form id="balance_operation_create">
                ${this.getBalanceOperationForm()}
            </form>
        `;
    }

    async createBalanceOperation() {
        const params = this.getBalanceOperationFormParams();
        params.InvestorId = this.InvestorId;
        const response = await this.api.investorBalanceOperation.create(params);

        if (response.Status) {
            this.redirect(this.pathFor('investor_balance_operation_index', {InvestorId: this.InvestorId}));
        } else {
            const formSelector = '#balance_operation_create';
            const errorsFields = this.getBalanceOperationFormErrorFields();

            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
