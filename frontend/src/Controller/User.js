import Base   from './Base';
import Index  from '../Page/User/Index';
import Create from '../Page/User/Create';
import Update from '../Page/User/Update';
import Delete from '../Page/User/Delete';

export default class User extends Base {
    async index() {
        this.render(new Index());
    }

    async create() {
        this.render(new Create());
    }

    async update(params) {
        const response = await this.api.user.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            User: response.User
        }));
    }

    async delete(params) {
        const response = await this.api.user.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Delete({
            User: response.User
        }));
    }
}
