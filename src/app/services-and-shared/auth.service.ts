import { Injectable } from '@angular/core';
import {User} from "../_interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private token: string = ""
  private isAdmin: boolean = false

  constructor(
    private http: HttpClient)
  {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username: string, password: string): Observable<any>{
  return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
    .pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user)
        if (user.id === 1) {
          localStorage.setItem('Admin', "true")
          this.setAdmin(true)
        } else {
          localStorage.setItem('Admin', "false")
          this.setAdmin(false)
        }
        let tokenS = user.token!.toString()
        localStorage.setItem('token', tokenS)
            this.setToken(tokenS)
      })
    )
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  registred(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/register`, user)
  }

  setToken(token: string) {
    this.token = token
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin
  }

  getIsAdmin() {
    return this.isAdmin
  }

  getToken() {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
  logout() {
    this.setToken('')
    localStorage.removeItem('token');
    localStorage.removeItem('Admin');
    // @ts-ignore
    this.userSubject.next(null);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  update(id: number, params: User) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (+id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }
}
