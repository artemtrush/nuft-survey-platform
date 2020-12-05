import Base   from './Base';
import Index  from '../Page/Role/Index';
import Create  from '../Page/Role/Create';
import Update  from '../Page/Role/Update';
import Delete  from '../Page/Role/Delete';

export default class Role extends Base {
    async index() {
        this.render(new Index());
    }

    async create() {
        this.render(new Create());
    }

    async update(params) {
        const response = await this.api.role.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            Role: response.Role
        }));
    }

    async delete(params) {
        const response = await this.api.role.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Delete({
            Role: response.Role
        }));
    }
}
