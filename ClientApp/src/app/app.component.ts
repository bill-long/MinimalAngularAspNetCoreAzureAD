import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <p>This is the AppComponent.</p>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  
  constructor(private authService: AuthService) { }

}
