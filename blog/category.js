const database = require("../database");
const asyncHandler = require("express-async-handler");

const dbConnection = database().getConnection();

let categoriesApi = async (req, res) => {

}

let initCategoriesApi = (app) => {
    app.post('/categories', asyncHandler(categoriesApi));
}

module.exports = initCategoriesApi;