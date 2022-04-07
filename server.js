const express = require('express');

const authentication = require('./authentication');
const middlewares = require('./middlewares');
const welcome = require('./welcome');


const app = express();
const port = 3000;

//initializing middlewares
middlewares(app);

//initializing authentication
authentication(app);

//initializing welcome
welcome(app);




app.listen(port, () => {
    console.log('Server is running at port: ', port);
})