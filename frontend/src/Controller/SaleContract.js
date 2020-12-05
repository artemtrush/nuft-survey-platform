import Base   from './Base';
import Index  from '../Page/SaleContract/Index';
import Show  from '../Page/SaleContract/Show';

export default class SaleContract extends Base {
    async index() {
        this.render(new Index());
    }

    async show(params) {
        const response = await this.api.saleContract.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Show({
            SaleContract: response.SaleContract
        }));
    }
}
