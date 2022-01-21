import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services-and-shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-top-bar',
  templateUrl: './user-top-bar.component.html',
  styleUrls: ['./user-top-bar.component.css']
})
export class UserTopBarComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
