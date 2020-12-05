import Session      from '../Module/Session';
import api          from '../apiSingleton';
import ErrorPage    from "../Page/Modal/Error";
import routes       from '../Module/Routes';
import Cache        from "./Cache";

/* Content onload callbacks */

let isContentLoaded = false;
let contentCallbacks = [];
function clearContentOnLoadCallbacks() {
    contentCallbacks = [];
}
export function addContentOnLoadCallback(cb) {
    if (!isContentLoaded) {
        contentCallbacks.push(cb);
    } else {
        return cb();
    }
}
export function startCollectingContentOnLoadCallbacks() {
    isContentLoaded = false;
    clearContentOnLoadCallbacks();
}
export function runContentOnLoadCallbacks() {
    $.each(contentCallbacks, (idx, cb) => {
        cb();
    });
    clearContentOnLoadCallbacks();
    isContentLoaded = true;
}


/* Page routing */

export function displayPage(page) {
    page.display();
}

export function pathFor(routeName, params = {}) {
    let linkPath = '#';

    Object.keys(routes).some(path => {
        const route = routes[ path ];
        if ('name' in route && route.name == routeName) {
            linkPath += path;
            return true;
        }
    });

    Object.keys(params).sort((a, b) => {
        return b.length - a.length;
    }).forEach(key => {
        linkPath = linkPath.replace(':' + key, params[ key ]);
    });

    return linkPath;
}

export function linkForEntityShowPage(entityName, entityId, additionalText = '') {
    if (!entityName || !entityId) {
        return '';
    }

    const params = {
        Id: entityId
    };
    let path = pathFor(entityName + '_show', params);
    if (!path || path == '#') {
        path = pathFor(entityName + '_update', params);
    }

    return `
        <div class="show-page-link">
            <a href="${path}">
                ${entityId} ${additionalText}
            </a>
        </div>
    `;
}


/* Page errors aborting */

export function abortWithText(text = 'Произошла ошибка') {
    if (!Session.isAuth()) {
        return window.dispatcher.redirectToHash('session/create');
    }

    displayPage(new ErrorPage(text));
}

export function abortAccessDenied() {
    return abortWithText('Доступ закрыт');
}

export function abortNotFound() {
    return abortWithText('Объект не найден');
}

export async function loadStates() {
    const userId = Session.getUserId();
    if (userId) {
        const response = await api.user.show(userId);
        if (response.Status) {
            Storage.set('User', response.User);
            return true;
        }
    }

    Session.logout();
    return false;
}


/* Page events */

export function resizeTables() {
    $('.dataTables_wrapper .row > .col-sm-12 tbody').css('max-height', `${$(window).height() * 0.7}px`);
}

export function pinEvents() {
    $(window).on('resize', () => {
        resizeTables();
    });
}

export async function getServerConfigValue(key) {
    const cache = new Cache();
    const cacheKey = 'config_' + key;

    let value = cache.getItem(cacheKey);
    if (value === false) {
        const data = await api.config.show(key);
        value = key in data ? data[ key ] : null;
        if (value !== null) {
            cache.setItem(cacheKey, value);
        }
    }

    return value;
}

export async function executeAfterConfirmation(callback, confirmationType, confirmationEntityId = null) {
    api.userConfirmationCode.create({
        UserId: Storage.get('User').Id,
        Type: confirmationType,
        EntityId: confirmationEntityId
    });

    showConfirmModal(
        `
            <div class="text-center">
                <p>Введите код подтверждения</p>
                <input id="confirmation-code" type="text" maxlength="8" placeholder="00000000">
            </div>
        `,
        () => {
            const confirmationCode = $('#confirmation-code').val();
            callback(confirmationCode ? confirmationCode : 'none');
        }
    );
}


/* Page modals */

export function showSuccessModal(text) {
    const html = `
        <div class="modal" id="successModal" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Успешно</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${text}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#modals').html(html);
    $('#successModal').modal();
}

export function showWarningModal(text) {
    const html = `
        <div class="modal" id="warningModal" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Предупреждение</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${text}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-warning" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#modals').html(html);
    $('#warningModal').modal();
}

export function showConfirmModal(text, confirmCb = null, cancelCb = null) {
    const html = `
        <div class="modal" id="confirmModal" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Подтвердите действие</h5>
                        <button type="button" class="cancel-modal-button close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${text}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="cancel-modal-button btn btn-danger" data-dismiss="modal">Отменить</button>
                        <button class="confirm-modal-button btn btn-success" data-dismiss="modal">Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#modals').html(html);
    $('#confirmModal').modal();

    if (confirmCb) {
        $('#confirmModal .confirm-modal-button').offon('click', null, () => confirmCb() );
    }
    if (cancelCb) {
        $('#confirmModal .cancel-modal-button').offon('click', null, () => cancelCb() );
    }
}
