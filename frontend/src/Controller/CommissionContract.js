import Base   from './Base';
import Index  from '../Page/CommissionContract/Index';
import Show  from '../Page/CommissionContract/Show';

export default class CommissionContract extends Base {
    async index() {
        this.render(new Index());
    }

    async show(params) {
        const response = await this.api.commissionContract.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Show({
            CommissionContract: response.CommissionContract
        }));
    }
}
