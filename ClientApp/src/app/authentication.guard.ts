import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _oauthService: OAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this._oauthService.hasValidAccessToken()) {
            // send the url as the state, so when it comes back, we can return
            // to the route that forced the user to auth
            this._oauthService.initImplicitFlow(state.url);
            return false;
        }

        return true;
    }
}