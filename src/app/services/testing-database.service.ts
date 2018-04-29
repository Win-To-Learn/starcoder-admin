import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Player } from '../models/player.model';
import {User} from '../models/user.model';
import {Organization} from '../models/organization.model';

@Injectable()
export class TestingDatabaseService {

    constructor() { }

    getPlayer (id): Observable<Player> {
        return Observable.of(Object.assign({}, search(id, players)));
    }

    getPlayersByOrg (org_id): Observable<Player[]> {
        let result = [];
        for (let player of players) {
            if (player.organization._id === org_id) {
                result.push(player);
            }
        }
        return Observable.of(result);
    }

    getLocations (): Observable<string[]> {
        let s = new Set();
        for (let player of players) {
            s.add(player.location);
        }
        return Observable.of(Array.from(s.values()));
    }

    newPlayer (organization): Observable<Player> {
        return Observable.of({
            username: '',
            password: '',
            location: '',
            organization,
            logins: []
        });
    }

    getUser (id): Observable<User> {
        return Observable.of(search(id, users));
    }

    getOrganization (id): Observable<Organization> {
        return Observable.of(search(id, organizations));
    }

    savePlayer (player) {
        if (player._id) {
            let oldPlayer = search(player._id, players);
            Object.assign(oldPlayer, player);
        } else {
            // new
            player._id = nextPlayerId++;
            players.push(player);
        }
    }
}

function search (id, a) {
    for (let item of a) {
        if (item._id === id) {
            return item;
        }
    }
    return null;
}

// Test data
const organizations: Organization[] = [
    {_id: '11', name: 'Win2Learn', locations: ['Columbia', 'New York', 'Boston']},
    {_id: '12', name: 'Longleaf Middle', locations: ['Columbia']}
];

const users: User[] = [
    {_id: '21', username: 'jay', fullname: 'Jay Bloodworth', organizations: [organizations[0], organizations[1]]}
];

let nextPlayerId = 1000;

const players: Player[] = [
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
