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
                return null;
            }
            return {
                _id: doc._id,
                username: doc.username,
                password: doc.ptPassword,
                logins: doc.logins,
                location: doc.location,
                organization: doc.organization
            };
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

    getLocationsByOrg: function (orgId) {
        return orgs.findOne({_id: OID(orgId)}, {projection: {locations: 1}}).then((result)=> {
            return result.locations;
        });
    },

    savePlayer: function (player) {
        let promise;
        let org_id = OID(player.organization._id);
        if (player._id) {
            // update
            let updateSpec = {
                username: player.username,
                location: player.location
            };
            if (player.password) {
                updateSpec.ptPassword = player.password;
                updateSpec.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync());
            }
            promise = players.findOneAndUpdate({_id: OID(player._id)}, {$set: updateSpec});
        } else {
            player.ptPassword = player.password;
            player.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync());
            player.organization = org_id;
            promise = players.insertOne(player);
        }
        return promise.then((result) => {
            return orgs.findOneAndUpdate({_id: org_id}, {$addToSet: {locations: player.location}}).then(() => {
                return result;
            });
        });
    },

    getUserByName: function (username) {
        return users.findOne({username});
    },

    getMultipleOrganizations: function (oids) {
        return orgs.find({_id: {$in: oids}}).toArray();
    }
};