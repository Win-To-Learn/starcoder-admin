import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { SessionService } from './services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private session: SessionService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.session.getUser()) {
            return true;
        }

        this.session.setRedirectUrl(url);
        this.router.navigate(['/login']);
        return false;
    }
}