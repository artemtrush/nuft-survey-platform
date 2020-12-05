import moment from 'moment';
import {toInt, notLessThanZero} from './Math';

export function currentDate() {
    return moment();
}

export function currentTimestamp() {
    return toInt(formatDate(currentDate(), 'X'));
}

export function formatDateTime(date, format = 'YYYY-MM-DD HH:mm') {
    if (!date) {
        return '';
    }

    return moment(date).format(format);
}

export function formatDate(date, format = 'YYYY-MM-DD') {
    return formatDateTime(date, format);
}

export function getDatesDiffInDays(dateFirst, dateSecond) {
    dateFirst = formatDate(dateFirst);
    dateSecond = formatDate(dateSecond);

    return notLessThanZero(moment(dateFirst).diff(dateSecond, 'days'));
}
