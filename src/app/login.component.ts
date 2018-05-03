import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';
import {Observable} from 'rxjs/Observable';
import { catchError} from 'rxjs/operators';

import {SessionService} from './services/session.service';
import {RestDatabaseService as DatabaseService} from './services/rest-database.service';


@Component({
    selector: 'login',
    templateUrl: './html/login.html'
})
export class LoginComponent {
    username: string;
    password: string;
    msgs: Message[] = [];

    constructor(private database: DatabaseService,
                private session: SessionService,
                private router: Router) { }

    login() {
        this.session.login(this.username, this.password).pipe(catchError((error) => {
            if (error instanceof ErrorEvent || error.status !== 401) {
                this.msgs = [{severity: 'error', summary: 'Network Error', detail: 'Try again later'}]
            } else {
                this.msgs = [{severity: 'warn', summary: 'Error', detail: 'Wrong username or password'}];
            }
            return Observable.of(null);
        })).subscribe((user) => {
            if (user) {
                this.router.navigate([this.session.useRedirectUrl() || '/players']);
            }
        });
    }

}