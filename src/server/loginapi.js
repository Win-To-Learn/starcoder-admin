/**
 * loginapi.js
 *
 * Created by jay on 4/29/18
 */

//const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function (app, secret) {
    app.get('/login/test', (req, res) => {
        res.send(jsonwebtoken.sign({id: "123", username: 'jay'}, secret, {expiresIn: '1 week'}));
    });
};