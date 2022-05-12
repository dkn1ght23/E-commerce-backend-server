const cors = require('cors');

let initCors = (app) => {
    app.use('*', cors());
}

module.exports = initCors;