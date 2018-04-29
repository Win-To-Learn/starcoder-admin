import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import {Message} from 'primeng/components/common/api';

import {Player} from './models/player.model';
import {Organization} from './models/organization.model';

import {RestDatabaseService as DatabaseService} from './services/rest-database.service';
import {GeneratePasswordService} from './services/generate-password.service';
import {SessionService} from './services/session.service';

@Component({
    selector: 'edit-user',
    templateUrl: './html/edit-player.html'
})
export class EditPlayerComponent implements OnInit {
    player: Player;
    organization: Organization;
    locations: SelectItem[];
    mode: string;
    inProgress: boolean = false;
    messages: Message[] = [];

    constructor (private database: DatabaseService,
                 private session: SessionService,
                 private genpass: GeneratePasswordService,
                 private router: Router,
                 private route: ActivatedRoute) { }

    ngOnInit () {
        this.getPlayer();
        this.getOrganization();
        this.getLocations();
    }

    getLocations () {
        this.database.getLocations().subscribe((locations) => {
            this.locations = [{label: 'Select Location', value: ''}];
            for (let location of locations) {
                this.locations.push({label: location, value: location});
            }
        });
    }

    getOrganization () {
        this.session.selectedOrg.subscribe((org) => {
            this.organization = org;
            if (this.player) {
                this.player.organization = org;
            }
        });
    }

    genPassword() {
        this.genpass.getPassword().subscribe((pass) => {
            this.player.password = pass;
        });
    }

    getPlayer () {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === 'new') {
            this.mode = 'New';
            this.database.newPlayer(this.organization).subscribe((player) => {
                this.player = player;
            });
        } else {
            this.database.getPlayer(id).subscribe((player) => {
                if (player) {
                    this.mode = 'Edit';
                    this.player = player;
                    this.player.organization = this.organization;
                } else {
                    this.mode = 'New';
                    this.database.newPlayer(this.organization).subscribe((player) => {
                        this.player = player;
                        this.player.organization = this.organization;
                    });
                }
            });
        }
    }

    savePlayer () {
        //this.inProgress = true;
        this.database.savePlayer(this.player);
        this.router.navigate(['/players']);
    }
}