import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {

    private _tenant = '5168560b-873c-42c2-aec8-3c06b70424b6';
    private _clientId = 'e3cb70f2-eae4-4872-94a4-9be8a98655d7';

    constructor(private oauthService: OAuthService, private router: Router) {

        this.oauthService.oidc = true;

        // Login-Url
        this.oauthService.loginUrl =
            `https://login.microsoftonline.com/${this._tenant}/oauth2/authorize`;

        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin;

        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = this._clientId;

        // set the scope for the permissions the client should request
        this.oauthService.scope = 'openid profile';

        // Azure AD expects these values
        this.oauthService.responseType = 'id_token';
        this.oauthService.resource = this._clientId;

        // Set the issuer so we can validate the token
        this.oauthService.issuer = `https://sts.windows.net/${this._tenant}/`;

        // Note that if you use sessionStorage here, you may experience problems when using
        // Edge browser on an intranet. You'll know you're hitting this problem if the
        // the angular-oauth2-oidc library is returning "invalid_nonce_in_state".
        //
        // We store a nonce prior to redirecting for auth, and that nonce is
        // stored in whatever storage is specified here. It turns out that Edge will
        // not preserve data in sessionStorage when a redirect across zones
        // happens - for example, from the intranet zone to the internet zone.
        //
        // Thus, the nonce we stored gets wiped out.
        //
        // We must therefore use localStorage as the storage service for the
        // angular-oauth2-oidc plugin, so that auth works in Edge when running on
        // the intranet. If that is not a concern for you, you can use sessionStorage
        // here.
        this.oauthService.setStorage(localStorage);

        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl = `https://login.microsoftonline.com/${this._tenant}/oauth2/logout`;

        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It dosn't send the user the the login page
        this.oauthService.tryLogin({
            onTokenReceived: (info) => {
                if (info.state) {
                    this.router.navigateByUrl(info.state);
                }
            }
        });
    }

}