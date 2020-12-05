import {getItemByKey} from './Collection';

/* General form utils */

export function recursiveFillObject(object, defaultObject) {
    if (!object) {
        return defaultObject;
    }

    for (const key in defaultObject) {
        const defaultProperty = defaultObject[ key ];

        if (typeof defaultProperty === 'object') {
            object[ key ] = recursiveFillObject(object[ key ], defaultProperty);
        } else if (typeof object[ key ] === 'undefined' || object[ key ] === null) {
            object[ key ] = defaultProperty;
        }
    }

    return object;
}

export function convertParamsToFormData(params) {
    const data = new FormData();
    let filesCounter = 1;

    function recursiveAppendItem(key, item) {
        if (item instanceof File) {
            const fileKey = 'File' + filesCounter;
            filesCounter++;

            data.append(key, fileKey);
            data.append(fileKey, item);
        } else if (typeof item === 'object') {
            $.each(item, (objectKey, objectItem) => {
                if (key) {
                    objectKey = key + '[' + objectKey + ']';
                }
                recursiveAppendItem(objectKey, objectItem);
            });
        } else {
            data.append(key, item);
        }
    }

    recursiveAppendItem('', params);

    return data;
}

/* Balance operation */

export function translateBalanceOperationType(name) {
    const translates = {
        replenishment: 'Пополнение баланса',
        transfer: 'Перевод средств между балансами',
        withdrawal: 'Вывод средств с баланса'
    };
    return getItemByKey(translates, name, '');
}

export function translateBalanceOperationMethod(name) {
    const translates = {
        card: 'Оплата картой',
        cash: 'Наличный рассчет',
        cashless: 'Безналичный рассчет'
    };
    return getItemByKey(translates, name, '');
}

export function translateBalanceOperationStatus(name) {
    const translates = {
        pending: 'На стадии рассмотрения',
        hold: 'На удержании',
        confirmed: 'Подтверждено',
        canceled: 'Отменено'
    };
    return getItemByKey(translates, name, '');
}


/* Investor */

export function translateInvestorStatus(name) {
    const translates = {
        active: 'Активен',
        blocked: 'Заблокирован',
        deleted: 'Удален'
    };

    return getItemByKey(translates, name, '');
}


/* SaleContract */

export function translateSaleContractStatus(name) {
    const translates = {
        generated: 'Ожидает подтверждения менеджером МФО',
        confirmed: 'Ожидает подписания',
        signed: 'Подписан',
        rejected: 'Предварительный отказ',
        notEnoughLoanContracts: 'Недостаточно договоров займа',
        notEnoughRegularLoanContracts: 'Недостаточно договоров займа постоянных заемщиков',
        zeroAmountPledgeContract: 'Нулевая сумма договора залога',
        expired: 'Договор закончен',
        closed: 'Сумма перечислена',
        archive: 'Архив'
    };

    return getItemByKey(translates, name, '');
}


/* CommissionContract */

export function translateCommissionContractStatus(name) {
    const translates = {
        draft: 'Черновик',
        confirmed: 'Подтвержден',
        active: 'Активен',
        expired: 'Завершен',
        archive: 'Архив',
        canceled: 'Отменен'
    };

    return getItemByKey(translates, name, '');
}


/* LoanContract */

export function translateLoanContractBorrowerType(name) {
    const translates = {
        new: 'Новый',
        regular: 'Постоянный'
    };

    return getItemByKey(translates, name, '');
}
