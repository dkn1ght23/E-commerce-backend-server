const bodyParser = require("body-parser");

let initBodyParser = (app) => {
    app.use(bodyParser.json());
}

module.exports = initBodyParser;