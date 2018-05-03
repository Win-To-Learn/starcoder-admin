/**
 * index.js
 *
 * Created by jay on 4/29/18
 */

const path = require('path');
const express = require('express');
const app = express();

const restapi = require('./restapi');
const loginapi = require('./loginapi');
const db = require('./db.js');

// Config ///////
const PORT = 4200;
const secret = 'S/P9ZjBSgaI8n9AHwG3GghgG4mf4lDscF6TH7M8AWa5KtTW2OpkNZZpB9MJqD4sc';
const basedir = path.join(__dirname, '../../dist');
//const dbUri = 'mongodb://localhost:27017';
const dbUri = 'mongodb://8f430f6d1c664352bc7a03fd25a4eeeb:a0bc1ff6774045ceae6b8b37a9292910@ds061200.mongolab.com:61200/starcoder';
const dbName = 'starcoder';
const dbCollections = {players: 'testpeople', organizations: 'testorganizations', users: 'testusers'};
// End Config //

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

restapi(app, secret, dbUri);
loginapi(app, secret, dbUri);

const appPaths = [
    '/',
    '/players',
    '/player/:id',
    '/login'
];
for (let p of appPaths) {
    app.get(p, (req, res) => {
        res.sendFile(path.join(basedir, '/index.html'));
    });
}

const staticFiles = [
    'vendor.bundle.js',
    'styles.bundle.js',
    'polyfills.bundle.js',
    'inline.bundle.js',
    'main.bundle.js',
    'color.c7a33805ffda0d32bd2a.png',
    'line.567f57385ea3dde2c9ae.gif'
];
for (let f of staticFiles) {
    app.get(`/${f}`, (req, res) => {
        res.sendFile(path.join(basedir, `/${f}`));
    });
    if (f.substr(-3) === '.js') {
        app.get(`/${f}.map`, (req, res) => {
            res.sendFile(path.join(basedir, `/${f}.map`));
        });
    }
}

db.connect(dbUri, dbName, dbCollections).then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
