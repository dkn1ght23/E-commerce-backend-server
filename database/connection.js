const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-commerce',
});


let getConnection = () => {
    return connection.promise();
}

module.exports = () => {
    return {
        getConnection: getConnection
    }
}