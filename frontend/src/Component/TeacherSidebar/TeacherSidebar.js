import Base from './../Base';

import './TeacherSidebar.less';

export default class TeacherSidebar extends Base {
    async html() {
        return `
            <div class="TeacherSidebar sidebar">
                <div class="top-btns">
                    <div class="sidebar-head">
                        <span>МОДУЛЬ</span>
                        <span>ОПИТУВАННЯ</span>
                    </div>

                    <div class="sidebar-btn profile-btn">Профіль</div>
                    <div class="sidebar-btn surveys-btn">Опитування</div>
                </div>

                <div class="bottom-btns">
                    <div class="sidebar-btn logout-btn">Вихід</div>
                </div>
            </div>
        `;
    }

    async events() {
        const currentHash = window.location.hash;

        const buttonsBindings = {
            '.profile-btn' : 'teacher_profile',
            '.surveys-btn' : 'teacher_surveys'
        };

        for (const [ className, pageName ] of Object.entries(buttonsBindings)) {
            const $btn = $(`.TeacherSidebar ${className}`);
            const pageHash = this.utils.pathFor(pageName);

            if (pageHash === currentHash) {
                $btn.addClass('active');
            }

            $btn.click(() => {
                this.utils.redirect(pageName);
            });
        }

        $('.TeacherSidebar .logout-btn').click(() => {
            this.session.logout();

            this.utils.redirect('entrance');
        });
    }
}
