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

// Config ///////
const PORT = 4200;
const secret = 'S/P9ZjBSgaI8n9AHwG3GghgG4mf4lDscF6TH7M8AWa5KtTW2OpkNZZpB9MJqD4sc';
const basedir = path.join(__dirname, '../../dist');
// End Config //

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

restapi(app, secret);
loginapi(app, secret);

const appPaths = [
    '/',
    '/players',
    '/player/:id'
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
