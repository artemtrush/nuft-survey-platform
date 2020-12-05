import Session      from '../Module/Session';
import routes       from '../Module/Routes';

/* Page routing */

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
