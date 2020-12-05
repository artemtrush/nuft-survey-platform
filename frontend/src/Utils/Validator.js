import {openTabWithErrorField} from '../Component/NavigationTabs';
import {getFileResponseErrorType} from './File';

const errorTypesText = {
    ACCESS_DENIED: "У вас недостаточно прав для выполнения данной операции",
    UNKNOWN_ERROR: "Неизвестная ошибка",

    REQUIRED: "Поле обязательное",
    CANNOT_BE_EMPTY: "Поле не может быть пустым",
    TOO_SHORT: "Значение слишком короткое",
    TOO_LONG: "Значение слишком длинное",
    TOO_LOW: "Значение слишком малое",
    TOO_HIGH: "Значение слишком большое",
    FIELDS_NOT_EQUAL: "Значения не совпадают",
    FIELD_INCORRECT: "Значение некорректно",
    NOT_INTEGER: "Поле должно быть числом",
    NOT_POSITIVE_INTEGER: "Поле должно быть положительным числом",
    ALREADY_EXISTS: "Значение не является уникальным",

    USER_EMAIL_EXISTS: "Пользователь с таким email уже существует",
    LOGIN_EXISTS: "Пользователь с таким логином уже существует",
    WRONG_EMAIL_OR_PASSWORD: "Неверный email или пароль",
    WRONG_LOGIN_OR_PASSWORD: "Неверный логин или пароль",

    WRONG_LOGIN: "Неверный формат логина",
    WRONG_EMAIL: "Некорректный email ",
    FORMAT_ERROR: "Некорректные данные",
    INCORRECT: "Некорректные данные",
    WRONG_AUTHORIZATION: "Некорректные данные для входа",
    WRONG_CONFIRMATION_CODE: "Некорректный код подтверждения",

    NOT_UNIQUE: "Объект не уникален",
    ITEM_NOT_FOUND: "Объект не найден",
    ITEM_NAME_EXISTS: "Объект с таким названием уже существует",
    ITEM_CANNOT_BE_UPDATED_TO_STATUS: "Объекту нельзя присвоить данный статус",

    DELETE_CURRENT_USER: "Пользователь не может удалить самого себя",
    USERS_WITH_ROLE_EXISTS: "Есть пользователи с данной ролью. Её нельзя удалить!",
    COMPANIES_WITH_PACKAGE_EXISTS: "Есть МФО которые используют данный пакет. Его нельзя удалить!",

    FILE_SIZE_EXCEEDED: "Превышен максимальный размер файла",
    FILE_WRONG_EXTENSION: "Неверное расширение файла",
    FILE_UPLOAD_FAILED: "Не удалось загрузить файл",

    REQUEST_FORMAT_ERROR : "Некорректный формат ответа на запрос",
    REQUEST_RUNTIME_ERROR: "Ошибка выполнения запроса",

    BALANCE_CANNOT_BE_NEGATIVE: "Баланс не может быть отрицательным",
    BALANCE_OPERATION_CANNOT_BE_UPDATED: "Эту операцию нельзя редактировать!",
    BALANCE_OPERATION_INCORRECT_DATA: "Некорректные данные для создания операции"
};

export async function showFormError(formSelector, response, errorsFields = {}) {
    if (response.Error) {
        const fields = response.Error.Fields;
        const $formErrorField = $(`${formSelector} #form_error`);

        if (fields) {
            hideFieldError($formErrorField);
        } else {
            showFieldError($formErrorField, translateErrorType(response.Error.Type));
        }

        await showFormFieldsErrors(formSelector, errorsFields, fields);
    }
}

export function translateErrorType(errorType) {
    if (errorType && typeof errorType !== 'string') {
        return translateNestedValidateResponse(errorType);
    }

    if (!errorType || !errorTypesText.hasOwnProperty(errorType)) {
        errorType = 'UNKNOWN_ERROR';
    }

    return errorTypesText[ errorType ];
}

function showFieldError($field, text) {
    $field
        .addClass('has-error')
        .find('.help-block')
        .html(text);
}

function hideFieldError($field) {
    $field
        .removeClass('has-error')
        .find('.help-block')
        .html('');
}

async function showFormFieldsErrors(formSelector, errorsFields = {}, serverErrors) {
    const fields = recursiveMatchFieldsWithErrors(errorsFields, serverErrors);

    let minIdxOfTabWithErrorField = null;
    fields.forEach(field => {
        const $field = $(`#helper_${field.FieldId}`);

        if (field.ErrorType) {
            showFieldError($field, translateErrorType(field.ErrorType));

            const tabIdx = openTabWithErrorField($field, minIdxOfTabWithErrorField);
            if (tabIdx !== null) {
                minIdxOfTabWithErrorField = tabIdx;
            }
        } else {
            hideFieldError($field);
        }
    });
}

function translateNestedValidateResponse(listErrors) {
    const errorsTexts = [];

    Object.values(listErrors).forEach(errorsRow => {
        if (errorsRow) {
            Object.keys(errorsRow).forEach(fieldName => {
                const errorType = errorsRow[ fieldName ];
                const $fieldLabel = $(`[data-nested-list-label-for="${fieldName}"]`);

                if ($fieldLabel.length && $fieldLabel.text() && errorTypesText.hasOwnProperty(errorType)) {
                    const text = `${$fieldLabel.text()} - ${errorTypesText[ errorType ]}`;
                    if (!errorsTexts.includes(text)) {
                        errorsTexts.push(text);
                    }
                }
            });
        }
    });

    if (!errorsTexts.length) {
        return errorTypesText.UNKNOWN_ERROR;
    }

    return errorsTexts.join('<br/>');
}

function recursiveMatchFieldsWithErrors(errorFields, serverErrors) {
    const result = [];

    for (const [fieldName, fieldId] of Object.entries(errorFields)) {
        let fieldErrorType = serverErrors && serverErrors[ fieldName ] ? serverErrors[ fieldName ] : null;
        if (fieldErrorType && fieldErrorType.File) {
            fieldErrorType = getFileResponseErrorType(fieldErrorType.File);
        }

        if (typeof fieldId === 'object') {
            const fields = recursiveMatchFieldsWithErrors(fieldId, fieldErrorType);
            fields.forEach(field => {
                result.push(field);
            });
        } else {
            result.push({
                FieldId: fieldId,
                ErrorType: fieldErrorType
            });
        }
    }

    return result;
}
