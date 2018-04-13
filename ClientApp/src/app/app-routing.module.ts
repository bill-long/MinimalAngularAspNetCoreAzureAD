import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthenticationGuard } from "./authentication.guard";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
      path: '', component: HomeComponent, canActivate: [AuthenticationGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthenticationGuard]
  })
  export class AppRoutingModule { }
  