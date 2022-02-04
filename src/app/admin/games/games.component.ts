import { Component, OnInit } from '@angular/core';
import {Game} from "../../_models/game";
import {GameService} from "../../services-and-shared/game.service";
import {first} from "rxjs";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  gameList?: Game[]
  games!: Game[]
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getAllGames().pipe(first()).subscribe(games => {
      this.games = games
    })
  }

  public deleteGames(): void {
    for (let changeGame of this.gameList!) {
      this.gameService.deleteGame(changeGame.id!)
        .pipe(first())
        .subscribe(() => this.games = this.games.filter(x => x.id !== changeGame.id!));
    }
    this.gameList = undefined
  }
}
