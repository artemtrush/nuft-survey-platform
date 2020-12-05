import Base   from './Base';
import Index  from '../Page/Company/Index';
import Create from '../Page/Company/Create';
import Update from '../Page/Company/Update';
import Delete from '../Page/Company/Delete';

export default class Company extends Base {
    async index() {
        this.render(new Index());
    }

    async create() {
        this.render(new Create());
    }

    async update(params) {
        const response = await this.api.company.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            Company: response.Company
        }));
    }

    async delete(params) {
        const response = await this.api.company.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Delete({
            Company: response.Company
        }));
    }
}
