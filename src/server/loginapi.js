/**
 * loginapi.js
 *
 * Created by jay on 4/29/18
 */

//const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./db.js');

//jsonwebtoken.sign({id: "123", username: 'jay'}, secret, {expiresIn: '1 week'})

module.exports = function (app, secret) {
    app.post('/login/credentials', express.json(), (req, res) => {
        console.log('Checking', req.body.username, req.body.password);
        checkLogin(req.body.username, req.body.password).then((user) => {
            if (user) {
                db.getMultipleOrganizations(user.organizations).then((orgs) => {
                    user.organizations = orgs;
                    res.send(jsonwebtoken.sign(user, secret, {expiresIn: '1 week'}));
                });
            } else {
                res.sendStatus(401);
            }
        })
    });
};

function checkLogin (username, password) {
    return db.getUserByName(username).then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password;
            return user;
        } else {
            return null;
        }
    });
}

// function replaceOIDs (user) {
//     user._id = user._id.toHexString();
//     for (let org of user.organizations) {
//         org._id = org._id.toHexString();
//     }
// }