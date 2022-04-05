const express = require('express');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const database = require('./database');
const queryBuilder = require('./database/query-builder');
const dbConnection = database().getConnection();


const app = express();

const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(bodyParser.json());

app.post('/register', (req, res) => {

    //console.log(req.body);

    let params = req.body;

    let email = params.Email;
    let password = params.Password;
    let firstName = params.FirstName;
    let lastName = params.LastName;
    let phoneNumber = params.PhoneNumber;

    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);


    if(!email || !password || !firstName || !lastName || !phoneNumber){
        res.status(400).json({
            message: 'missing required fields',
            status: 400
        });
    } else{

        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(password, salt);

        const obj = {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            EnCryptefPassword: hash,
            PasswordSalt: salt,
            PhoneNumber: phoneNumber,
        }

        let data = queryBuilder.buildInsertQuery('users', obj);

        dbConnection.query(data.query, data.fields, (err, results, fields) => {

            //console.log(err);

            if(err){
                res.status(400).json({
                    message: 'registration failed',
                    status: 400
                });
            }else{
                res.json({
                    message: 'registration complete',
                    status: 200,
                })
            }

        })
    }
});

app.post('/login', (req, res) => {

    //console.log(req.body);

    let params = req.body;

    let email = params.Email;
    let password = params.Password;

    console.log(email);
    console.log(password);



    if(!email || !password){
        res.status(400).json({
            message: 'email or password is missing',
            status: 400
        });
    } else{

        //checking data using email in the user table

        const query = "SELECT * FROM users where ??=?";
        const fields = ['Email', email];

        //const hash = bcrypt.hashSync(password, salt);

        dbConnection.query(query, fields, (err, results, fields) => {

            //console.log(err);
            //console.log(results);
            //console.log(fields );

            if(!err && results && results.length > 0){

                //get user details
                let user = results[0];
                console.log(user);

                //we only need passwordSalt & EnCryptedPassword
                let enPass = user.EnCryptefPassword;
                let salt = user.PasswordSalt;

                //hash+salt = enPassword
                let hash = bcrypt.hashSync(password,salt);
                if(hash != enPass){
                    res.status(400).json({
                        message: 'Invalid password',
                        status: 400
                    });
                } else{
                    res.json({
                        message: 'log-in complete',
                        status: 200,
                    });
                }
            } else{
                res.status(400).json({
                    message: 'no registration',
                    status: 400
                });
            }

        })
    }
});

app.get('/' ,(req, res) => {
    res.json({
        message: 'Welcome to the node server',
        start: 200
    })
})

app.listen(port, () => {
    console.log('Server is running at port: ', port);
})