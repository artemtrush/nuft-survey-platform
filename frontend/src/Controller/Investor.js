import Base   from './Base';
import Index  from '../Page/Investor/Index';

export default class Investor extends Base {
    async index() {
        this.render(new Index());
    }
}
