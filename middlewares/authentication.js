const authTokenMod = require('./../authentication/token');

const tokenNotRequired = ['/login'];
const loginNotRequired = [];

let initAuthenticationMiddleware = (app) => {

    app.use((req, res, next) => {

        let path = req.url;

        if (tokenNotRequired.indexOf(path) >= 0) {
            next();
            return;
        }

        let headers = req.headers;
        let authToken = headers.authentication;

        let tokenPayload = authTokenMod.decodeToken(authToken)

        console.log(tokenPayload);

        if (!authToken || !tokenPayload) {
            res.status(401).json({
                message: 'Invalid token or token not found',
                status: 401,
                success: false,
                error: true
            })
        } else {
            next();
        }
    });
}

module.exports = initAuthenticationMiddleware;