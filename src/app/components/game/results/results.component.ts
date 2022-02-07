import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../services-and-shared/game.service";
import {LocalGame, Team} from "../../../_models/game";
import {User} from "../../../_models/user.interface";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public viewBundle!: LocalGame
  public changePlayerWinner?: User
  public players!: User[]
  public changeTeamWinner?: Team
  public teams!: Team[]
  public comment?: string

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {
    this.gameService.localBundle = JSON.parse(localStorage.getItem('gameBundle') || '')
    this.viewBundle = this.gameService.localBundle
    if (this.viewBundle.player1 && this.viewBundle.player2) {
      this.players = [this.viewBundle.player1, this.viewBundle.player2]
    }
    if (this.viewBundle.team1 && this.viewBundle.team2) {
      this.teams = [this.viewBundle.team1, this.viewBundle.team2]
    }
  }

  ngOnInit(): void {}

  public saveResult(): void {
    if (this.viewBundle.player1 && this.viewBundle.player2) {
      this.gameService.localBundle.player_winner = this.changePlayerWinner
      if (this.gameService.localBundle.player_winner === this.gameService.localBundle.player1) {
        this.gameService.localBundle.player_opposer = this.viewBundle.player2
      } else if (this.gameService.localBundle.player_winner === this.gameService.localBundle.player2) {
        this.gameService.localBundle.player_opposer = this.viewBundle.player1
      }
    }
    if (this.viewBundle.team1 && this.viewBundle.team2) {
      this.gameService.localBundle.team_winner = this.changeTeamWinner
      if (this.gameService.localBundle.team_winner === this.gameService.localBundle.team1) {
        this.gameService.localBundle.team_opposer = this.viewBundle.team2
      } else if (this.gameService.localBundle.team_winner === this.gameService.localBundle.team2) {
        this.gameService.localBundle.team_opposer = this.viewBundle.team1
      }
    }
    this.gameService.localBundle.comment = this.comment
    this.gameService.createGame().pipe(first())
      .subscribe({
        next: () => {
          console.log('Игра была создана')
          this.router.navigate(['../../statistics'])
        },
        error: error => {
          console.log(error)
        }
      });
  }

}
