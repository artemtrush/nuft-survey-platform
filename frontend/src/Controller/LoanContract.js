import Base   from './Base';
import Index  from '../Page/LoanContract/Index';
import Show  from '../Page/LoanContract/Show';

export default class LoanContract extends Base {
    async index() {
        this.render(new Index());
    }

    async show(params) {
        const response = await this.api.loanContract.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Show({
            LoanContract: response.LoanContract
        }));
    }
}
