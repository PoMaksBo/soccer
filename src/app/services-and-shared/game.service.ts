import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Game, LocalGame, Team} from "../_models/game";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public localBundle!: LocalGame
  private bundle!: Game

  constructor(
    private http: HttpClient,
  ) {

  }

  private  reverseBundle(localBundle: LocalGame): Game {
    let reverse!: Game
    if (localBundle.player_winner) {
      reverse = {
        dt: localBundle.dt,
        alias: localBundle.alias,
        player_winner: localBundle.player_winner,
        player_opposer: localBundle.player_opposer
      }
    }
    if (localBundle.team_winner) {
      reverse = {
        dt: localBundle.dt,
        alias: localBundle.alias,
        team_winner: localBundle.team_winner,
        team_opposer: localBundle.team_opposer
      }
    }
    if (localBundle.comment) {
    reverse.comment = localBundle.comment
    }
    return reverse
  }

  public createGame(): Observable<Game> {
    this.bundle = this.reverseBundle(this.localBundle)
    return this.http.post<Game>(`${environment.apiUrl}/createGame`, this.bundle)
  }

  public getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`);
  }

  public deleteGame(id: number) {
    return this.http.delete(`${environment.apiUrl}/game/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }


}
