import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./main-page/authentication/authentication.component";
import {RegistredComponent} from "./main-page/registred/registred.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserPersonalComponent} from "./user-page/user-personal/user-personal.component";
import {AuthGuard} from "./services-and-shared/auth.guard";


const routes: Routes = [
  {path: '', component: MainPageComponent, children: [
      {path: 'registration', component: RegistredComponent},
      {path: 'login', component: AuthenticationComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full' }
    ]},
  {path: 'userPage', component: UserPageComponent, canActivate: [AuthGuard], children:[
      {path: 'userPage', redirectTo: 'userPage/personal-page', pathMatch: 'full'},
      {path: 'personal-page', component:  UserPersonalComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
