import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import {AppRoutingModule} from "./app-routing.module";
import { RegistredComponent } from './registred/registred.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GeneralTableComponent } from './general-table/general-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    RegistredComponent,
    AuthenticationComponent,
    GeneralTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
