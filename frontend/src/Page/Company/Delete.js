import DeleteModal from "../Modal/Delete";

export default class Delete extends DeleteModal {
    confirmCallback() {
        this.deleteCompany();
    }

    closeCallback() {
        this.redirect(this.pathFor('company_index'));
    }

    getDeletedEntityName() {
        return `МФО "${_.escape(this.Company.Name)}"`;
    }

    async deleteCompany() {
        const response = await this.api.company.delete(this.Company.Id);
        this.treatDeleteResponse(response);
    }
}
