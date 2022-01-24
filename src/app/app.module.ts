import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { TopPanelComponent } from './main-page/top-panel/top-panel.component';
import {AppRoutingModule} from "./app-routing.module";
import { RegistredComponent } from './main-page/registred/registred.component';
import { AuthenticationComponent } from './main-page/authentication/authentication.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserTopBarComponent } from './user-page/user-top-bar/user-top-bar.component';
import { UserPersonalComponent } from './user-page/user-personal/user-personal.component';
import {TokenInterceptor} from "./services-and-shared/token.interceptor";
import {fakeBackendProvider} from "./services-and-shared/fake-backend";
import { AlertComponent } from './main-page/alert/alert.component';
import { ErrorInterceptor } from './services-and-shared/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    RegistredComponent,
    AuthenticationComponent,
    MainPageComponent,
    UserPageComponent,
    UserTopBarComponent,
    UserPersonalComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
