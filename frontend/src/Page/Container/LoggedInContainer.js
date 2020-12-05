import Base from "../Base";

export default class LoggedInContainer extends Base {
    content() {
        if ($('body').hasClass('only-auth')) {
            return;
        }

        $('#content').empty();
        $('body').attr('class', 'hold-transition skin-blue-light sidebar-mini only-auth');

        const user = this.loggedUser();
        const userPermissions = user.Permissions ? user.Permissions : [];

        function hasOneOf(permissions) {
            let permitted = false;
            $.each(permissions, (idx, permission) => {
                if (userPermissions.includes(permission)) {
                    permitted = true;
                    return false;
                }
            });
            return permitted;
        }

        return `
            <div class="wrapper">
                <header class="main-header">
                    <span class="logo">
                        <span class="logo-mini"><b>SI</b></span>
                        <span class="logo-lg"><b>SI</b> Admin</span>
                    </span>
                    <nav class="navbar navbar-static-top" role="navigation">
                        <span href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span class="sr-only">Toggle navigation</span>
                        </span>
                        <div class="navbar-custom-menu">
                            <ul class="nav navbar-nav">
                                <li class="dropdown user user-menu">
                                    <a
                                        href="#" class="dropdown-toggle"
                                        data-toggle="dropdown"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <i class="fa fa-user"></i>
                                        <span>${ _.escape(user.Email) }</span>
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li>
                                            <a href="${this.pathFor('user_profile_update', {Id: user.Id})}">
                                                <i class="fa fa-vcard"></i>
                                                <span>Профиль</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#session/delete" class="route logout">
                                                <i class="fa fa-user-times"></i>
                                                <span>Выход</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="progressbar"><span class="progressbar__progress"></span></div>
                </header>
                <aside class="main-sidebar">
                    <section class="sidebar">
                        ${ hasOneOf(['user', 'role', 'calendar', 'calendar_view']) ? `
                            <ul class="sidebar-menu tree" data-widget="tree">
                                 <li class="treeview">
                                    <a href="#">
                                        <i class="fa fa-book"></i>
                                        <span>Справочники</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        ${ hasOneOf(['user']) ? `
                                            <li>
                                                <a href="${this.pathFor('user_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Пользователи</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                        ${ hasOneOf(['role']) ? `
                                            <li>
                                                <a href="${this.pathFor('role_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Роли</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                        ${ hasOneOf(['calendar', 'calendar_view']) ? `
                                            <li>
                                                <a href="${this.pathFor('calendar_update')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Календарь</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                    </ul>
                                </li>
                            </ul>
                        ` : `` }
                        ${ hasOneOf(['company', 'package', 'commissioner']) ? `
                            <ul class="sidebar-menu tree" data-widget="tree">
                                 <li class="treeview">
                                    <a href="#">
                                        <i class="fa fa-university"></i>
                                        <span>Управление партнерами</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        ${ hasOneOf(['company']) ? `
                                            <li>
                                                <a href="${this.pathFor('company_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Список МФО</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                        ${ hasOneOf(['package']) ? `
                                            <li>
                                                <a href="${this.pathFor('package_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Список пакетов</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                        ${ hasOneOf(['commissioner']) ? `
                                            <li>
                                                <a href="${this.pathFor('commissioner_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Список комиссионеров</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                    </ul>
                                </li>
                            </ul>
                        ` : `` }
                        ${ hasOneOf(['investor', 'investor_view']) ? `
                            <ul class="sidebar-menu tree" data-widget="tree">
                                 <li class="treeview">
                                    <a href="#">
                                        <i class="fa fa-users"></i>
                                        <span>Управление клиентами</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        ${ hasOneOf(['investor', 'investor_view']) ? `
                                            <li>
                                                <a href="${this.pathFor('investor_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Список клиентов</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                    </ul>
                                </li>
                            </ul>
                        ` : `` }
                        ${ hasOneOf(['commission_contract', 'loan_contract', 'sale_contract', 'sale_contract_view']) ? `
                            <ul class="sidebar-menu tree" data-widget="tree">
                                 <li class="treeview">
                                    <a href="#">
                                        <i class="fa fa-file-text"></i>
                                        <span>Управление договорами</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                                    </a>
                                    <ul class="treeview-menu">
                                         ${ hasOneOf(['commission_contract']) ? `
                                            <li>
                                                <a href="${this.pathFor('commission_contract_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Договора комиссии</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                         ${ hasOneOf(['loan_contract']) ? `
                                            <li>
                                                <a href="${this.pathFor('loan_contract_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Договора займа</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                         ${ hasOneOf(['sale_contract', 'sale_contract_view']) ? `
                                            <li>
                                                <a href="${this.pathFor('sale_contract_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Договора КП и ДЗ</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                    </ul>
                                </li>
                            </ul>
                        ` : `` }
                        ${ hasOneOf(['registry_report']) ? `
                            <ul class="sidebar-menu tree" data-widget="tree">
                                 <li class="treeview">
                                    <a href="#">
                                        <i class="fa fa-archive"></i>
                                        <span>Управление отчетами</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        ${ hasOneOf(['registry_report']) ? `
                                            <li>
                                                <a href="${this.pathFor('registry_report_index')}">
                                                    <i class="fa fa-angle-double-right"></i>
                                                    <span>Реестр 1С</span>
                                                </a>
                                            </li>
                                        ` : ``}
                                    </ul>
                                </li>
                            </ul>
                        ` : `` }
                    </section>
                </aside>
                <div class="content-wrapper">
                    <section class="content-header"></section>
                    <section class="content container-fluid main-content"></section>
                </div>
            </div>
        `;
    }
}
