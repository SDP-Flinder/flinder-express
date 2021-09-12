const express = require('express');
const expressJwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const config = require('config.json');

module.exports = {
    jwt,
    logout
};

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked: blacklist.isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

// router.get('/logout', logout);

function logout(req, res) {
    const authString = req.headers.authorization;
    if (authString.startsWith("Bearer ")){
        token = authString.substring(7, authString.length);
        blacklist.revoke(token)
        res.status(200).json({message: 'token-revoked'});
    } else {
        res.status(400).json({message: 'revoke-failed'});
    }
        // .then(user => user ? res.json(user) : res.status(400).json({ message: 'incorrect-username-password' }))
        // .catch(err => next(err));
}

// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };