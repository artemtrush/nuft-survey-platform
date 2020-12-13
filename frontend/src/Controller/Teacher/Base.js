/* eslint-disable func-style */

import Base from './../Base';

export default class TeacherBase extends Base {
    async validate() {
        if (!this.session.isAuthorizedTeacher()) {
            this.utils.redirect('entrance');
        }
    }

    async renderSidebar() {
        const { TeacherSidebar } = this.components;

        return new TeacherSidebar();
    }
}
