import DeleteModal from "../Modal/Delete";

export default class Delete extends DeleteModal {
    confirmCallback() {
        this.deleteCommissioner();
    }

    closeCallback() {
        this.redirect(this.pathFor('commissioner_index'));
    }

    getDeletedEntityName() {
        return `комиссионера "${_.escape(this.Commissioner.Name)}"`;
    }

    async deleteCommissioner() {
        const response = await this.api.commissioner.delete(this.Commissioner.Id);
        this.treatDeleteResponse(response);
    }
}
