import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {RegistredComponent} from "./registred/registred.component";
import {GeneralTableComponent} from "./general-table/general-table.component";


const routes: Routes = [
  {path: 'registration', component: RegistredComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'general-table', component: GeneralTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
