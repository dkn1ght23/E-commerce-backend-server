const userDetailsApi = require('./userdetails');

let initUserAccessManagementModule = (app) => {
    userDetailsApi(app)
}

module.exports = (app) => {
    initUserAccessManagementModule(app);
}