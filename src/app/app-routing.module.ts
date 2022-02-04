import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {AuthenticationComponent} from "./title/authentication/authentication.component";
import {RegisteredComponent} from "./title/registred/registered.component";
import {TitleComponent} from "./title/title.component";
import {UserComponent} from "./components/user/user.component";
import {PersonalComponent} from "./components/user/personal/personal.component";
import {AuthGuard} from "./services-and-shared/auth.guard";
import {GameComponent} from "./components/game/game.component";
import {CreateComponent} from "./components/game/create/create.component";
import {ResultsComponent} from "./components/game/results/results.component";
import {AdminComponent} from "./admin/admin.component";
import {TeamsComponent} from "./admin/teams/teams.component";
import {GamesComponent} from "./admin/games/games.component";
import {PlayersComponent} from "./admin/players/players.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {TestComponent} from "./test/test.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

// canActivate: [AuthGuard] - условие авторизации

const routes: Routes = [
  {path: '', component: TitleComponent, children: [
      {path: 'registration', component: RegisteredComponent},
      {path: 'login', component: AuthenticationComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full' },
    ]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], children:[
      {path: 'personal', component:  PersonalComponent},
      {path: 'user', redirectTo: '/personal'},
    ]},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard], children:[
      {path: 'create', component: CreateComponent},
      {path: 'results', component: ResultsComponent}
    ]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: 'games', component: GamesComponent},
      {path: 'players', component: PlayersComponent},
      {path: 'team', component: TeamsComponent}
    ]},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
