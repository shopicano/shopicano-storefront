class SessionStore {
    static SetSession(ctx, session) {
        ctx.set('shopicano_access_token', session.access_token);
        ctx.set('shopicano_refresh_token', session.refresh_token);
        ctx.set('shopicano_expire_on', session.expire_on);
    }

    static GetAccessToken(ctx) {
        return ctx.get('shopicano_access_token');
    }

    static IsLoggedIn(ctx) {
        let token = ctx.get('shopicano_access_token');
        let expireOn = ctx.get('shopicano_expire_on');
        let now = new Date().getTime() / 1000;

        return token !== null && now < expireOn;
    }

    static CleanSession(ctx) {
        ctx.remove('shopicano_access_token');
        ctx.remove('shopicano_refresh_token');
        ctx.remove('shopicano_expire_on');
    }

    static isUnauthorized(err) {
        let resp = err.response;
        return resp.status === 401
    }

    static setReturnPath(ctx, path) {
        ctx.set('shopicano_return_path', path)
    }

    static getReturnPath(ctx) {
        return ctx.get('shopicano_return_path')
    }
}

export default SessionStore;
