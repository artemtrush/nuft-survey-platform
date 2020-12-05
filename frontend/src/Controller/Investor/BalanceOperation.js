import Base   from '../Base';
import Index  from '../../Page/Investor/BalanceOperation/Index';
import Create from '../../Page/Investor/BalanceOperation/Create';
import Update from '../../Page/Investor/BalanceOperation/Update';

export default class BalanceOperation extends Base {
    async index(params) {
        this.render(new Index(params));
    }

    async create(params) {
        this.render(new Create(params));
    }

    async update(params) {
        const response = await this.api.investorBalanceOperation.show(params.Id, params);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            InvestorId: params.InvestorId,
            BalanceOperation: response.BalanceOperation
        }));
    }
}
