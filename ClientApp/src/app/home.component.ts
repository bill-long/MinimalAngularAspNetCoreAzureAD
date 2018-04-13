import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    template: `
    <div>
        <p>This is the HomeComponent. You should only see this after you authenticate, due to the route guard.
        Remember that anyone can hit F12 and see this text in your source files. The guard only makes sure the
        user is authenticated before we activate the route. Data that should not be public needs to be in your
        web API, and we'll use the auth token to get access to that.</p>
        <p></p>
        <p *ngIf="thing | async as t">
            Title: {{t.title}}
            <br>
            Text: {{t.text}}
        </p>
    </div>
    `
})
export class HomeComponent {

    private thing: Observable<{ title: String; text: String }>;

    constructor(private apiService: ApiService) {

        this.thing = apiService.getThingFromApi();
    }
}