import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services-and-shared/auth.service";
import {User} from "../../_models/user.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: User
  players = false
  games = false
  teams = false

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.userValue
    // this.authService.user.subscribe(player => this.user = player)
  }

  ngOnInit(): void {}

  public viewPlayers (): void {
    this.players = !this.players
    this.games = false
    this.teams = false
  }

  public viewGames (): void {
    this.games = !this.games
    this.teams = false
    this.players = false
  }

  public viewTeams (): void {
    this.teams = !this.teams
    this.players = false
    this.games = false
  }
}
