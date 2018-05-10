/**
 * restapi.js
 *
 * Created by jay on 4/29/18
 */

const express = require('express');
const jwt = require('express-jwt');

const db = require('./db.js');

module.exports = function (app, secret) {
    app.use('/api', jwt({secret}), (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.sendStatus(401);
        } else {
            next();
        }
    });

    app.use('/api', express.json());

    app.get('/api/player/:id', (req, res) => {
        db.getPlayerById(req.params.id).then((player) => {
            if (!player) {
                res.sendStatus(404);
            } else {
                // FIXME: check user rights
                res.send(player);
            }
        });
    });

    app.get('/api/org/:id/locations', (req, res) => {
        db.getLocationsByOrg(req.params.id).then((locations) => {
            res.send(locations);
        });
    });

    app.post('/api/players', (req, res) => {
        let player = req.body.player;
        db.savePlayer(player).then((result) => {
            res.sendStatus(202);
        }, (err) => {
            console.log('E', err);
        });
    });

    app.get('/api/players/org/:id', (req, res) => {
        db.getPlayersByOrg(req.params.id).then((result) => res.send(result));
    });

    app.get('/api/players/org/:id/login/:month/:year', (req, res) => {
        db.getPlayersByOrgAndLogin(req.params.id,
            Number.parseInt(req.params.month), Number.parseInt(req.params.year)).then((result) => res.send(result));
    });

};

// Test Data

function search (id, a) {
    for (let item of a) {
        if (item._id === id) {
            return item;
        }
    }
    return null;
}

const organizations = [
    {_id: '11', name: 'Win2Learn', locations: ['Columbia', 'New York', 'Boston']},
    {_id: '12', name: 'Longleaf Middle', locations: ['Columbia']}
];

const users = [
    {_id: '21', username: 'jay', fullname: 'Jay Bloodworth', organizations: [organizations[0], organizations[1]]}
];

let nextPlayerId = 1000;

const players = [
    {_id: '31', username: 'bob', password: 'abc123', location: 'New York', organization: organizations[0],
        logins: [new Date('2018-4-1'), new Date('2018-4-10')]},
    {_id: '32', username: 'alice', password: 'abc123', location: 'New York', organization: organizations[0],
        logins: [new Date('2018-4-5')]},
    {_id: '33', username: 'carol', password: 'abc123', location: 'Boston', organization: organizations[0], logins: []},
    {_id: '34', username: 'dave', password: 'abc123', location: 'Boston', organization: organizations[0], logins: []},
    {_id: '35', username: 'eve', password: 'abc123', location: 'Columbia', organization: organizations[0], logins: []},
    {_id: '36', username: 'frank', password: 'abc123', location: 'Columbia', organization: organizations[1], logins: []},
    {_id: '37', username: 'grace', password: 'abc123', location: 'Columbia', organization: organizations[1], logins: []}
];
