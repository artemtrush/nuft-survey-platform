import DeleteModal from "../Modal/Delete";

export default class Delete extends DeleteModal {
    confirmCallback() {
        this.deleteRole();
    }

    closeCallback() {
        this.redirect(this.pathFor('role_index'));
    }

    getDeletedEntityName() {
        return `роль "${_.escape(this.Role.Name)}"`;
    }

    async deleteRole() {
        const response = await this.api.role.delete(this.Role.Id);
        this.treatDeleteResponse(response);
    }
}
