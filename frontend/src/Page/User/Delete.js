import DeleteModal from "../Modal/Delete";

export default class Delete extends DeleteModal {
    confirmCallback() {
        this.deleteUser();
    }

    closeCallback() {
        this.redirect(this.pathFor('user_index'));
    }

    getDeletedEntityName() {
        return `пользователя "${_.escape(this.User.Email)}"`;
    }

    async deleteUser() {
        const response = await this.api.user.delete(this.User.Id);
        this.treatDeleteResponse(response);
    }
}
