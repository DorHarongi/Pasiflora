import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router:Router, private loginService: LoginService ) {
 
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
 
        if (!this.loginService.isUserLoggedIn()) {            
            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;
        } 
        return true;
    }
 
}
 
