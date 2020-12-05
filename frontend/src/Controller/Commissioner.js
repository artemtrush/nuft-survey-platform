import Base   from './Base';
import Index  from '../Page/Commissioner/Index';
import Create from '../Page/Commissioner/Create';
import Update from '../Page/Commissioner/Update';
import Delete from '../Page/Commissioner/Delete';

export default class Commissioner extends Base {
    async index() {
        this.render(new Index());
    }

    async create() {
        this.render(new Create());
    }

    async update(params) {
        const response = await this.api.commissioner.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            Commissioner: response.Commissioner
        }));
    }

    async delete(params) {
        const response = await this.api.commissioner.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Delete({
            Commissioner: response.Commissioner
        }));
    }
}
