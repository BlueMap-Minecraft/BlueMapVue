/**
 * Adapted from https://www.w3schools.com/js/js_cookies.asp
 */
export const setCookie = (key, value, days = 360) => {
    value = JSON.stringify(value);

    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";" + "expires=" + expireDate.toUTCString() + ";" + "SameSite=Lax";
};

/**
 * Adapted from https://www.w3schools.com/js/js_cookies.asp
 */
export const getCookie = key => {
    let cookieString = decodeURIComponent(document.cookie);
    let cookies = cookieString.split(';');

    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(key + "=") === 0) {
            let value = cookie.substring(key.length + 1, cookie.length);

            try {
                value = JSON.parse(value);
            } catch (e) {} // eslint-disable-line no-empty

            return value;
        }
    }

    return undefined;
};

export const round = (value, precision) => {
    let f = Math.pow(10, precision);
    return Math.round(value * f) / f;
}
