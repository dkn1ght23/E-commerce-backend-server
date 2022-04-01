const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-commerce',
});

connection.connect();

let getConnection = () => {
    return connection;
}

module.exports = () => {
    return {
        getConnection: getConnection
    }
}