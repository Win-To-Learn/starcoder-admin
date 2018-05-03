import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

//import {RestDatabaseService as DatabaseService} from './rest-database.service';

import {User} from '../models/user.model';
import {Organization} from '../models/organization.model';

const jwthelp = new JwtHelperService();

@Injectable()
export class SessionService {
    private _user: BehaviorSubject<User>;
    user: Observable<User>;
    private _selectedOrg: BehaviorSubject<Organization>;
    selectedOrg: Observable<Organization>;
    private redirectUrl: string = null;

    constructor (private http: HttpClient) {
        this._user = new BehaviorSubject<User>(null);
        this.user = this._user.asObservable();
        this._selectedOrg = new BehaviorSubject<Organization>(null);
        this.selectedOrg = this._selectedOrg.asObservable();

    }

    login (username, password): Observable<any> {
        return this.http.post('/login/credentials', {username, password},
            {headers: {'Content-Type':  'application/json'}, responseType: "text"}).pipe(
                tap((token) => {
                localStorage.setItem('access-token', token);
                this.updateUser(jwthelp.decodeToken(token));
            }));
    }

    logout () {
        localStorage.removeItem('access-token');
        this.updateUser(null);
    }

    setCurrentOrg (org) {
        this._selectedOrg.next(org);
    }

    updateUser (user) {
        this._user.next(user);
        if (user) {
            this._selectedOrg.next(user.organizations[0]);
        } else {
            this._selectedOrg.next(null);
        }
    }

    checkLogin () {
        let user = this.getUser();
        this.updateUser(user);
    }

    getUser (): User {
        let token = this.getToken();
        if (token) {
            return jwthelp.decodeToken(token);
        } else {
            return null;
        }
    }

    getToken (): string {
        return localStorage.getItem('access-token');
    }

    setRedirectUrl (url) {
        this.redirectUrl = url;
    }

    useRedirectUrl (): string {
        let url = this.redirectUrl;
        this.redirectUrl = null
        return url;
    }
}

