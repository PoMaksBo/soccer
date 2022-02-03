import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  players = false
  games = false
  teams = false
  constructor() { }

  ngOnInit(): void {
  }

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
