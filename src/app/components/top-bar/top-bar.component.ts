import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services-and-shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
