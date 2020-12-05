export function first( collection ) {
    if (!collection) {
        return null;
    }

    const values = Object.values(collection);
    if (!values.length) {
        return null;
    }

    return values[0];
}

export function getItemByKey(collection, key, defaultValue = null) {
    if (collection &&
        typeof collection === 'object' &&
        key in collection
    ) {
        return collection[ key ];
    }

    return defaultValue;
}

