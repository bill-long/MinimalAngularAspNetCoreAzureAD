import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    getThingFromApi() {
        return this.httpClient.get<{ title: String; text: String }>('/api/thing');
    }
}