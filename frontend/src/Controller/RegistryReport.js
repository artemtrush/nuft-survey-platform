import Base   from './Base';
import Index  from '../Page/RegistryReport/Index';

export default class RegistryReport extends Base {
    async index() {
        this.render(new Index());
    }
}
