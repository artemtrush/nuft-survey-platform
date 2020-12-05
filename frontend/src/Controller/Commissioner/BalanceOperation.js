import Base   from '../Base';
import Index  from '../../Page/Commissioner/BalanceOperation/Index';
import Create from '../../Page/Commissioner/BalanceOperation/Create';
import Update from '../../Page/Commissioner/BalanceOperation/Update';

export default class BalanceOperation extends Base {
    async index(params) {
        this.render(new Index(params));
    }

    async create(params) {
        this.render(new Create(params));
    }

    async update(params) {
        const response = await this.api.commissionerBalanceOperation.show(params.Id, params);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            CommissionerId: params.CommissionerId,
            BalanceOperation: response.BalanceOperation
        }));
    }
}
