const bcrypt = require("bcrypt");
const database = require("../database");
const queryBuilder = require("../database/query-builder");
const asyncHandler = require("express-async-handler");

const dbConnection = database().getConnection();

let registrationApi = async (req, res) => {
    //console.log(req.body);

    let params = req.body;

    let email = params.Email;
    let password = params.Password;
    let firstName = params.FirstName;
    let lastName = params.LastName;
    let phoneNumber = params.PhoneNumber;

    /*console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);*/


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

        try{
            const [results, fields] = await dbConnection.execute(data.query, data.fields);

            let userId = results.insertId;
            console.log(userId);

            let roleData = queryBuilder.buildInsertQuery('userroles',{UserId: userId, role: 'user'});

            const [roleResults, roleFields] = await dbConnection.execute(roleData.query, roleData.fields);

            console.log(roleData);
            console.log(roleFields);

            res.json({
                message: 'registration complete',
                status: 200,
            })
        } catch (e) {
            res.status(400).json({
                message: e.message,
                status: 400
            });
        }
    }

}

let initRegistrationApi = (app) => {
    app.post('/register', asyncHandler(registrationApi));
}

module.exports = initRegistrationApi;