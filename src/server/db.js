/**
 * db.js
 *
 * Created by jay on 4/29/18
 */

const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const OID = mongodb.ObjectId;

let client;
let db;
let players;
let orgs;
let users;

module.exports = {
    connect: function (url, dbname, collections) {
        return MongoClient.connect(url).then((c) => {
            client = c;
            db = client.db('starcoder');
            players = db.collection(collections.players);
            orgs = db.collection(collections.organizations);
            users = db.collection(collections.users);
        });
    },

    getPlayerById: function (id) {
        return players.findOne({_id: OID(id)}).then((doc) => {
            if (!doc) {
                return Promise.resolve(null);
            }
            return Promise.resolve({
                _id: doc._id,
                username: doc.username,
                password: doc.ptPassword,
                logins: doc.logins,
                location: doc.location,
                organization: doc.organization
            });
        });
    },

    getPlayersByOrg: function (orgId) {
        // TODO: limit / skip logic
        return players.find({organization: OID(orgId)}).map((doc) => ({
            _id: doc._id,
            username: doc.username,
            password: doc.ptPassword,
            logins: doc.logins,
            location: doc.location,
            organization: doc.organization
        })).toArray();
    },

    savePlayer: function (player) {
        if (player._id) {
            // update
            let updateSpec = {
                username: player.username,
                location: player.location
            };
            if (player.password) {
                updateSpec.ptPassword = player.password
                updateSpec.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync());
            }
            return players.findOneAndUpdate({_id: OID(player._id)}, {$set: updateSpec});
        } else {
            player.ptPassword = player.password;
            player.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync());
            player.organization = OID(player.organization._id);
            return players.insertOne(player);
        }
    }
};