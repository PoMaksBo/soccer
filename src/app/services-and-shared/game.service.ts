import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Game} from "../_models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public bundle!: Game | null
  constructor(private http: HttpClient) { }

  public createTeam(): Observable<Game> {
    return this.http.post<Game>(`${environment.apiUrl}/game/createTeam`, this.bundle)
  }

  public createSolo(): Observable<Game> {
    return this.http.post<Game>(`${environment.apiUrl}/game/createSolo`, this.bundle)
  }

}
