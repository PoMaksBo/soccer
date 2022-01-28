import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Team} from "../_models/game";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.auth.userValue.id) {
          this.auth.logout();
        }
        return x;
      }));
  }

  // раздел методов для команд
  public getAllTeams() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }
}

