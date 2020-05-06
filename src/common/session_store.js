class SessionStore {
    static SetSession(session) {
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
        localStorage.setItem('expire_on', session.expire_on);
    }

    static GetAccessToken() {
        return localStorage.getItem('access_token');
    }

    static IsLoggedIn() {
        let token = localStorage.getItem('access_token');
        let expireOn = localStorage.getItem('expire_on');
        let now = new Date().getTime() / 1000;

        return token !== null && now < expireOn;
    }

    static CleanSession() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expire_on');
    }

    static isUnauthorized(err) {
        let resp = err.response;
        return resp.status === 401
    }
}

export default SessionStore;
