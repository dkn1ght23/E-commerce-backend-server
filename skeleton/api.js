const database = require("../database");
const asyncHandler = require("express-async-handler");

const dbConnection = database().getConnection();

let exampleApi = async (req, res) => {

}

let initExampleApi = (app) => {
    app.post('/login', asyncHandler(exampleApi));
}

module.exports = initExampleApi;