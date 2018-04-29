import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

import {User} from './models/user.model';
//import {Organization} from './models/organization.model';

import {SessionService} from './services/session.service';

@Component({
    selector: 'main-toolbar',
    templateUrl: './html/main-toolbar.html'
})
export class MainToolbarComponent implements OnInit {
    user: User;
    orgOptions: SelectItem[];

    constructor (private session: SessionService) { }

    ngOnInit () {
        let user = this.session.getUser();
        this.setUser(user);
    }

    setUser (user) {
        this.user = user;
        if (user.organizations.length > 1) {
            this.session.setCurrentOrg(user.organizations[0]);
            this.orgOptions = user.organizations.map((org) => ({label: org.name, value: org}));
        } else {
            this.session.setCurrentOrg(user.organizations[0]);
            this.orgOptions = [];
        }
    }

    orgChange (event) {
        this.session.setCurrentOrg(event.value);
    }
}