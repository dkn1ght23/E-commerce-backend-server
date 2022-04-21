const asyncHandler = require('express-async-handler')

const token = require('../authentication/token');

let getLoggedInUserDataApi = async (req, res) => {
    let authenticationToken = req.headers.authentication;
    if (authenticationToken) {
        let payload = token.decodeToken(authenticationToken);
        if (!payload) {
            res.status(400).json({
                status: 400,
                message: 'Invalid token provided',
                success: false,
                response: null
            })
        } else {
            //console.log("Payload Printing: ")
            //console.log(payload.FirstName);
            res.status(200).json({
                status: 200,
                message: 'Working',
                success: true,
                data: {
                    Email: payload.Email,
                    FirstName: payload.FirstName,
                    LastName: payload.LastName,
                    PhoneNumber: payload.PhoneNumber,
                    Roles: payload.Roles,
                    IsLoggedIn: true
                }
            })
        }
    } else {
        res.status(400).json({
            status: 400,
            message: 'Token not found in the request headers',
            success: false,
            response: null
        })
    }
}

let initUserDetailsApi = (app) => {
    app.get('/uam/GetLoggedInUser', asyncHandler(getLoggedInUserDataApi));
}

module.exports = initUserDetailsApi;