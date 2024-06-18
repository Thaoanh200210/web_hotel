class CookieProvider {
    constructor(request = null, response = null) {
        this.request = request;
        this.response = response;
    }
    
    setParamater(request, response) {
        this.request = request;
        this.response = response;
    }
    //lấy thông tin ng dùng, message
    getCookie(request, nameCookie) {
        return request.cookies[nameCookie];
    }
    setCookie(response, nameCookie, value, maxAge = 1) {
        response.clearCookie(nameCookie);
        let options = {
            maxAge: maxAge * 60 * 1000,
            httpOnly: true,
            signed: false,
        };
        response.cookie(nameCookie, value, options);
    }

    getSignedCookie(request, nameCookie) {
        return request.signedCookies[nameCookie];
    }
    setSignedCookie(response, nameCookie, value, maxAge = 1) {
        response.clearCookie(nameCookie);
        let options = {
            maxAge: maxAge * 60 * 1000,
            httpOnly: true,
            signed: true,
        };
        response.cookie(nameCookie, value, options);
    }
    clearCookie(response, nameCookie) {
        response.clearCookie(nameCookie);
    }
    getCookie(nameCookie) {
        return this.request.cookies[nameCookie];
    }
    setCookie(nameCookie, value, maxAge = 1) {
        this.response.clearCookie(nameCookie);
        let options = {
            maxAge: maxAge * 60 * 1000,
            httpOnly: true,
            signed: false,
        };
        this.response.cookie(nameCookie, value, options);
    }
    getSignedCookie(nameCookie) {
        return this.request.signedCookies[nameCookie];
    }
    setSignedCookie(nameCookie, value, maxAge = 1) {
        this.response.clearCookie(nameCookie);
        let options = {
            maxAge: maxAge * 60 * 1000,
            httpOnly: true,
            signed: true,
        };
        this.response.cookie(nameCookie, value, options);
    }
    clearCookie(nameCookie) {
        this.response.clearCookie(nameCookie);
    }
}

module.exports = { CookieProvider };
