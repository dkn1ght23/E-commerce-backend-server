const TOKEN_SECRET = 'Ft9gLBcZMjGZQ3lGHpTVodABhqCyQZr0vanX1RsCEMOP5OXPlGtS7yffm8H3ylAmaWOqmUt3Owzte0e76TqVrIBnSV0ImzgY';

const database = require("../database");
const jwt = require('jsonwebtoken');
const dbConnection = database().getConnection();


let generateToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, {algorithm: 'HS256'}, (err, token) => {
            if (err) {
                resolve(null);
            } else {
                resolve(token);
            }
        })
    });
}

let decodeToken = (token) => {
    if (!token)
        return null
    try {
        return jwt.verify(token, TOKEN_SECRET, {algorithm: 'HS256'});
    } catch (e) {
        console.log('Invalid token found');
        console.log(e.message);
        return null;
    }
}

let decodeTokenFromRequest = (req) => {
    let authToken = req.headers.authentication;
    return decodeToken(authToken);
}


let getUserRoles = async (userId) => {
    const query = "SELECT Role FROM userroles where UserId=?";
    const fields = [userId];

    const [results, _] = await dbConnection.execute(query,fields);

    let roles = []
    results.forEach((result) => {
        roles.push(result.Role);
    })

    return roles;
}

let getLoggedInUserToken = async (user) => {
    let roles = await getUserRoles(user.id);
    let token_payload = {
        exp: Math.floor(Date.now() / 1000) + (7 * 60),
        aud: '*',
        nbf: Math.floor(Date.now() / 1000),
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        PhoneNumber: user.PhoneNumber,
        Roles: roles,
        UserId: user.id,
        iss: 'Ng-Scratch'
    }
    return await generateToken(token_payload);
}

module.exports = {
    getLoggedInUsersToken: getLoggedInUserToken,
    decodeToken: decodeToken,
    decodeTokenFromRequest: decodeTokenFromRequest
}