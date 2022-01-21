import { Injectable } from '@angular/core';
import {User} from "../_interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private id: string = ""
  private isAdmin?: number
  constructor(
    private http: HttpClient)
  { }

  login(user: User): Observable<{id: string}>{
  return this.http.post<{id: string}>(`${environment.apiUrl}/users/authenticate`, user)
    .pipe(
      tap(
        ({id}) => {
          localStorage.setItem('id', id)
          this.setId(id)
        }),
      // tap(
      //   ({users: [{isAdmin}]}) => {
      //   localStorage.setItem('isAdmin', isAdmin.toString())
      //   this.setAdmin(isAdmin)
      //   })
    )
  }

  // login(user: User) {
  //   return of({id: "0", login: "mpoletaev", password: "123", isAdmin: 1}).pipe(
  //     tap(
  //       ({id}) => {
  //         localStorage.setItem('auth-id', id)
  //         this.setId(id)
  //       }),
  //     tap(
  //       ({isAdmin}) => {
  //         localStorage.setItem('isAdmin', isAdmin.toString())
  //         this.setAdmin(isAdmin)
  //       }))
  // }

  registred(user: User): Observable<User> {
    return this.http.post<User>('/users/register', user)
  }

  setId(id: string) {
    this.id = id
  }

  setAdmin(isAdmin: number) {
    this.isAdmin = isAdmin
  }

  getIsAdmin() {
    return this.isAdmin
  }

  getId() {
    return this.id
  }

  isAuthenticated(): boolean {
    return !!this.id
  }
  logout() {
    this.setId('')
    this.setAdmin(0)
    localStorage.clear()
  }
}
