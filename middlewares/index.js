const cors = require('./cors');
const parser = require('./parser');

let initMiddleWaresModule = (app) => {
    cors(app);
    parser(app);
}

module.exports = (app) => {
    initMiddleWaresModule(app);
}