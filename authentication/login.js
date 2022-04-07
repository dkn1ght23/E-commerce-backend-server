const bcrypt = require("bcrypt");
const database = require("../database");
const dbConnection = database().getConnection();

let initLoginApi = (app) => {

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
}

module.exports = initLoginApi;