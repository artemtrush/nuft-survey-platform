/* eslint-disable func-style */

import Base from './../Base';

export default class TeacherBase extends Base {
    async validate() {
        if (!this.session.isAuthorizedTeacher()) {
            this.utils.redirect('entrance');
        }
    }

    async renderSidebar() {
        const { DefaultSidebar } = this.components;

        return new DefaultSidebar();
    }
}
