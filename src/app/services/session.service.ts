import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {RestDatabaseService as DatabaseService} from './rest-database.service';

import {User} from '../models/user.model';
import {Organization} from '../models/organization.model';

@Injectable()
export class SessionService {
    private _selectedOrg: BehaviorSubject<Organization>;
    selectedOrg: Observable<Organization>;
    user: User = null;

    constructor (private database: DatabaseService) {
        // FIXME: testing
        this.database.getUser('21').subscribe((user) => {
            this.user = user;
            this._selectedOrg = new BehaviorSubject<Organization>(user.organizations[0]);
            this.selectedOrg = this._selectedOrg.asObservable();
        });
    }

    setCurrentOrg (org) {
        this._selectedOrg.next(org);
    }

    getUser (): User {
        return this.user;
    }
}

