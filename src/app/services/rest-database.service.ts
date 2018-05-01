import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Player } from '../models/player.model';
import {User} from '../models/user.model';
import {Organization} from '../models/organization.model';

@Injectable()
export class RestDatabaseService {

    constructor(private http: HttpClient) { }

    getPlayer (id): Observable<Player> {
        return this.http.get<Player>(`/api/player/${id}`);
    }

    getPlayersByOrg (org_id): Observable<Player[]> {
        return this.http.get<Player[]>(`/api/players/org/${org_id}`);
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
        console.log('posting?');
        this.http.post('/api/players', {player}, {responseType: 'text', headers: this.getHeaders()}).subscribe();
    }

    private getHeaders (): HttpHeaders {
        let headers = new HttpHeaders({'Content-Type':  'application/json'});
        return headers;
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
    {_id: "5ae6560ab2d69d5714c52bfe", name: 'Win2Learn', locations: ['Columbia', 'New York', 'Boston']},
    {_id: "5ae65a21b2d69d5714c52c6c", name: 'Longleaf Middle', locations: ['Columbia']}
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
