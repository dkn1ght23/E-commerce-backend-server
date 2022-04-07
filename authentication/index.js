let register = require('./register');
let login = require('./login');

let initAuthenticationModule = (app) => {
    register(app);
    login(app);
}

module.exports = (app) => {
    initAuthenticationModule(app);
}