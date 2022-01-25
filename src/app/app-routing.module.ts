import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./title/authentication/authentication.component";
import {RegistredComponent} from "./title/registred/registred.component";
import {TitleComponent} from "./title/title.component";
import {UserComponent} from "./components/user/user.component";
import {PersonalComponent} from "./components/user/personal/personal.component";
import {AuthGuard} from "./services-and-shared/auth.guard";
import {GameComponent} from "./components/game/game.component";
import {CreateComponent} from "./components/game/create/create.component";
import {ResultsComponent} from "./components/game/results/results.component";


const routes: Routes = [
  {path: '', component: TitleComponent, children: [
      {path: 'registration', component: RegistredComponent},
      {path: 'login', component: AuthenticationComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full' }
    ]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], children:[
      {path: 'user', redirectTo: 'user/personal', pathMatch: 'full'},
      {path: 'personal', component:  PersonalComponent}
    ]},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard], children:[
      {path: 'game', redirectTo: 'game/create', pathMatch: 'full'},
      {path: 'create', component: CreateComponent},
      {path: 'results', component: ResultsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
