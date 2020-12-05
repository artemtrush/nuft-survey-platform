import Base   from './Base';
import Index  from '../Page/Package/Index';
import Create from '../Page/Package/Create';
import Update from '../Page/Package/Update';
import Delete from '../Page/Package/Delete';

export default class Package extends Base {
    async index() {
        this.render(new Index());
    }

    async create() {
        this.render(new Create());
    }

    async update(params) {
        const response = await this.api.package.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            Package: response.Package
        }));
    }

    async delete(params) {
        const response = await this.api.package.show(params.Id);
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Delete({
            Package: response.Package
        }));
    }
}
