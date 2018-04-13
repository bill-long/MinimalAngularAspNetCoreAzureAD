import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient, private oauthService: OAuthService) { }

    getThingFromApi() {
        return this.httpClient.get<{ title: String; text: String }>('/api/thing', this.options);
    }

    private get options() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
            })
        };
    }
}