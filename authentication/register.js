const bcrypt = require("bcrypt");
const database = require("../database");
const queryBuilder = require("../database/query-builder");
const dbConnection = database().getConnection();

let initRegistrationApi = (app) => {
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
}

module.exports = initRegistrationApi;