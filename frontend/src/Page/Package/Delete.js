import DeleteModal from "../Modal/Delete";

export default class Delete extends DeleteModal {
    confirmCallback() {
        this.deletePackage();
    }

    closeCallback() {
        this.redirect(this.pathFor('package_index'));
    }

    getDeletedEntityName() {
        return `пакет "${_.escape(this.Package.Name)}"`;
    }

    async deletePackage() {
        const response = await this.api.package.delete(this.Package.Id);
        this.treatDeleteResponse(response);
    }
}
