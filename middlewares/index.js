const cors = require('./cors');
const parser = require('./parser');
const authentication = require('./authentication');

let initMiddleWaresModule = (app) => {
    cors(app);
    parser(app);
    authentication(app);
}

module.exports = (app) => {
    initMiddleWaresModule(app);
}