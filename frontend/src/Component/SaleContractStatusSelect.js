import api from '../apiSingleton';
import {
    getServerConfigValue,
    addContentOnLoadCallback,
    executeAfterConfirmation,
    showWarningModal
} from '../Utils/Page';
import {translateErrorType} from '../Utils/Validator';
import {getItemByKey} from '../Utils/Collection';
import {translateSaleContractStatus} from '../Utils/Form';

function getStatusTransferAction(status) {
    const statusActions = {
        confirmed: 'Подтвердить',
        signed: 'Подтвердить подписание',
        rejected: 'Предварительный отказ',
        closed: 'Сумма перечислена',
        archive: 'Архив'
    };

    if (status in statusActions) {
        return statusActions[ status ];
    }

    return '';
}

export function SaleContractStatusSelect(params) {
    const defaultParams = {
        ContractId: 0,
        CurrentStatus: '',
        Hint: ''
    };
    params = {...defaultParams, ...params};

    const selectId = `SaleContractStatusSelect-${params.ContractId}`;

    function updateContractStatus(statusParams) {
        api.saleContractStatus.update(params.ContractId, statusParams).then((response) => {
            if (!response.Status) {
                const text = translateErrorType(response.Error.Type);
                showWarningModal(text);
            } else {
                updateStatusesList(response.SaleContractStatus);
            }
        });
    }

    function updateStatusesList(currentStatus) {
        const $statusSpan = $(`#${selectId} .current-status`);
        const $list = $(`#${selectId} .dropdown-menu`);

        $statusSpan.text(translateSaleContractStatus(currentStatus));
        $list.empty();

        getServerConfigValue('sale_contract').then((config) => {
            const allowedStatuses = getItemByKey(config.statuses_transfer, currentStatus, []);
            if (!allowedStatuses.length) {
                $list.remove();
                return;
            }

            $.each(allowedStatuses, (idx, status) => {
                $list.append(`<li><a>${getStatusTransferAction(status)}</a></li>`);
                $list.find('a').last().click(() => {
                    if (status == 'confirmed') {
                        const updateCallback = (confirmationCode) => {
                            updateContractStatus({
                                Status: status,
                                ConfirmationCode: confirmationCode
                            });
                        };

                        executeAfterConfirmation(updateCallback, 'sale_contract_confirmation', params.ContractId);
                    } else {
                        updateContractStatus({ Status: status });
                    }
                });
            });
        });
    }

    addContentOnLoadCallback(() => {
        updateStatusesList(params.CurrentStatus);
    });

    return `
        <div class="input-group-btn inline-dropdown" id="${selectId}" title="${params.Hint}">
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="current-status"></span>
                <span class="fa fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu">
            </ul>
        </div>
    `;
}
