const bcrypt = require("bcrypt");
const database = require("../database");
const asyncHandler = require("express-async-handler");

const dbConnection = database().getConnection();
const jwtToken = require('./token');

let loginApi = async (req, res) => {

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

        const query = "SELECT * FROM users where Email=?";
        const fields = [email];

        try{
            const [results, _] = await dbConnection.execute(query,fields)
            console.log(results);

            if(results && results.length > 0){

                //get user details
                let user = results[0];
                //console.log(user);

                //we only need passwordSalt & EnCryptedPassword
                let enPass = user.EnCryptefPassword;
                let salt = user.PasswordSalt;

                //hash+salt = enPassword
                let hash = bcrypt.hashSync(password,salt);

                if(hash != enPass){
                    res.status(400).json({
                        message: 'Invalid password',
                        status: 400
                    })
                } else{
                    let token = await jwtToken.getLoggedInUsersToken(user);
                    if(token){
                        res.json({
                            token: token,
                            success: true,
                        })
                    }else{
                        res.status(400).json({
                            message: 'Login failed due to token generation failed',
                            status: 400
                        })
                    }
                }
            } else{
                res.status(400).json({
                    message: 'Invalid credential',
                    status: 400
                })
            }

        } catch (e) {
            res.status(400).json({
                message: e.message,
                status: 400
            })
        }

        //const hash = bcrypt.hashSync(password, salt);

    }
}

let initLoginApi = (app) => {

    app.post('/login', asyncHandler(loginApi));
}

module.exports = initLoginApi;