import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

import {SessionService} from './services/session.service';
import {RestDatabaseService as DatabaseService} from './services/rest-database.service';

import {Organization} from './models/organization.model';
import {Player} from './models/player.model';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

@Component({
    selector: 'billing',
    templateUrl: './html/billing.html'
})
export class BillingComponent implements OnInit {
    organization: Organization;
    players: Player[] = [];
    months: SelectItem[] = [];
    month: {month: number, year: number};
    rate: number = 2;

    constructor(private database: DatabaseService,
                private session: SessionService) { }

    ngOnInit () {
        this.setupMonths();
        this.session.selectedOrg.subscribe((org) => {
            this.organization = org;
            if (org) {
                this.updatePlayers();
            }
        });

    }

    setupMonths () {
        let d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
        this.month = {month, year};
        for (let i = 0; i < 12; i++) {
            this.months.push({label: `${monthNames[month]} ${year}`, value: {month, year}});
            if (month === 0) {
                month = 11;
                year -= 1;
            } else {
                month -= 1;
            }
        }
    }


    updatePlayers () {
        this.database.getPlayersByOrgAndLogin(this.organization._id,
            this.month.month, this.month.year).subscribe((players) => {
                this.players = players;
        });
    }

}