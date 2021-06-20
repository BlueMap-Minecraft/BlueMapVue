/**
 * Converts a given value to JSON and writes it to the given key in
 * localStorage.
 */
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    value = JSON.stringify(value);
};

/**
 * Fetches the value from a given key from localStorage. If the stored value is
 * in JSON format, the parsed value will be returned.
 */
export const getLocalStorage = key => {
    const value = localStorage.getItem(key)

    try {
        return JSON.parse(value)
    } catch(e) {
        return value
    }
};

export const round = (value, precision) => {
    let f = Math.pow(10, precision);
    return Math.round(value * f) / f;
}
