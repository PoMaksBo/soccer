import { Component } from '@angular/core';
import {AuthService} from "./services-and-shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // constructor(
  //   private loggin: AuthService
  // ) {
  //   this.loggin.test().subscribe(x => {
  //     console.log(x)
  //   })
  // }
}
