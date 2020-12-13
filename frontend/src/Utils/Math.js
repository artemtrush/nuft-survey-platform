export function toInt( v ) {
    return parseInt(v, 10) || 0;
}

export function toFloat( v ) {
    return parseFloat(v) || 0;
}

export function toDecimal( v ) {
    return toFloat(v).toFixed(2);
}

export function toNatural( v ) {
    const n = parseInt(v, 10) || 0;
    return ( n > 0 ? n : -n );
}

export function abs( v ) {
    return Math.abs(v);
}

export function notLessThanZero( v ) {
    return Math.max(v, 0);
}
