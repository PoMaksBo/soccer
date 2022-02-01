import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Team} from "../_models/game";
import {User} from "../_models/user.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // public deleteUser(id: number) {
  //   return this.http.delete(`${environment.apiUrl}/users/${id}`)
  //     .pipe(map(x => {
  //       // auto logout if the logged in user deleted their own record
  //       if (id == this.auth.userValue.id) {
  //         this.auth.logout();
  //       }
  //       return x;
  //     }));
  // }

  public disablePlayer(id: number, params: User): Observable<JSON> {
    if (params.status === 1) {
      params.status = 0
    } else if (params.status === 0) {params.status = 1}
    return this.http.put<JSON>(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }



  // раздел методов для команд
  public getAllTeams() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }

  public createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${environment.apiUrl}/teams/create`, team)
  }

  public deleteTeam(id: number) {
    return this.http.delete(`${environment.apiUrl}/teams/${id}`)
        .pipe(map(x => {
          return x;
        }));
  }
}

