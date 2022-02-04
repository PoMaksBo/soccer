import { Component } from '@angular/core';
import {AuthService} from "./services-and-shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

<<<<<<< HEAD
  // constructor(
  //   private loggin: AuthService
  // ) {
  //   this.loggin.test().subscribe(x => {
  //     console.log(x)
  //   })
  // }
=======
  constructor(
    private loggin: AuthService
  ) {
    this.loggin.test().subscribe(x => {
      console.log(x)
    })
  }
>>>>>>> a514326cac6e8b0f615840adf06c76e4b611fa6f
}
