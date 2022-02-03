import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CookieModule} from "ngx-cookie";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";

import { AppComponent } from './app.component';
import { TopPanelComponent } from './title/top-panel/top-panel.component';
import {AppRoutingModule} from "./app-routing.module";
import { RegisteredComponent } from './title/registred/registered.component';
import { AuthenticationComponent } from './title/authentication/authentication.component';
import { TitleComponent } from './title/title.component';
import { UserComponent } from './components/user/user.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PersonalComponent } from './components/user/personal/personal.component';
import {TokenInterceptor} from "./services-and-shared/token.interceptor";
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './services-and-shared/error.interceptor';
import { GameComponent } from './components/game/game.component';
import { ResultsComponent } from './components/game/results/results.component';
import { CreateComponent } from './components/game/create/create.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PlayersComponent } from './admin/players/players.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { GamesComponent } from './admin/games/games.component';

import {fakeBackendProvider} from "./services-and-shared/fake-backend";
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UsersStatComponent } from './components/statistics/users-stat/users-stat.component';
import { TeamsStatComponent } from './components/statistics/teams-stat/teams-stat.component';
import {TestComponent} from "./test/test.component";
import { GamesListComponent } from './components/statistics/games-list/games-list.component';
import { GameResultComponent } from './components/statistics/games-list/game-result/game-result.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    RegisteredComponent,
    AuthenticationComponent,
    TitleComponent,
    UserComponent,
    TopBarComponent,
    PersonalComponent,
    AlertComponent,
    GameComponent,
    ResultsComponent,
    CreateComponent,
    AdminComponent,
    DashboardComponent,
    PlayersComponent,
    TeamsComponent,
    GamesComponent,
    StatisticsComponent,
    UsersStatComponent,
    TeamsStatComponent,
    TestComponent,
    GamesListComponent,
    GameResultComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatListModule,
        MatCheckboxModule,
        CookieModule.forRoot(),
        MatRadioModule,
        MatTableModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
