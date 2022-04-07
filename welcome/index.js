let welcome = require('./welcome');

let initWelcomeModule = (app) => {
    welcome(app);
}
module.exports = (app) => {
    initWelcomeModule(app);
}