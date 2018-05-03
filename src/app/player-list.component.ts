import { Component, OnInit } from '@angular/core';

import {SessionService} from './services/session.service';
import {RestDatabaseService as DatabaseService} from './services/rest-database.service';

import {Organization} from './models/organization.model';
import {Player} from './models/player.model';

@Component({
    selector: 'edit-user',
    templateUrl: './html/player-list.html'
})
export class PlayerListComponent implements OnInit {
    organization: Organization;
    players: Player[];

    constructor(private database: DatabaseService,
                private session: SessionService) { }

    ngOnInit () {
        this.session.selectedOrg.subscribe((org) => {
            this.organization = org;
            if (org) {
                this.database.getPlayersByOrg(org._id).subscribe((players) => {
                    this.players = players;
                });
            }
        });

    }

    lastLogin (player) {
        if (player.logins.length) {
            let d = new Date(player.logins[player.logins.length - 1]);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        } else {
            return 'Never';
        }
    }

}