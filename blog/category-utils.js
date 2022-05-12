const database = require("../database");
const queryBuilder = require('../database/query-builder');

const dbConnection = database().getConnection();

const categoryTable = 'categories'

let insertCategory = async (categoryName) => {

    let categoryData = {
        Name: categoryName
    }

    let data = queryBuilder.buildInsertQuery(categoryTable, categoryData);
    const [results, fields] = await dbConnection.execute(data.query, data.fields);
    return results.insertId;
}

let isCategoryNameAlreadyExists = async (categoryName) => {
    let categoryToLower = categoryName.toLowerCase();
    const query = `SELECT id, Name FROM ${categoryTable} where Name=?`;
    const fields = [categoryToLower];
    const [results, _] = await dbConnection.execute(query, fields);
    return results.length > 0 ? results[0].id : -1;
}

let getCategoriesByBlogId = async (blogId) => {
    const query = `SELECT Categories.Name as Name FROM Categories JOIN BlogCategories
 ON Categories.id = BlogCategories.CategoryId 
 WHERE BlogCategories.BlogId = ${blogId}`;
    const [results, _] = await dbConnection.execute(query);
    return results;
}


module.exports = {
    isCategoryNameAlreadyExists: isCategoryNameAlreadyExists,
    insertCategory: insertCategory,
    getCategoriesByBlogId: getCategoriesByBlogId
}