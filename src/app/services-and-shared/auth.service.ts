import { Injectable } from '@angular/core';
import {User} from "../_models/user.interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import { environment } from 'src/environments/environment';
import {Router} from "@angular/router";
import {Team} from "../_models/game";

@Injectable({providedIn: 'root'})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private token = ""

  constructor(private http: HttpClient,
              private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(username: string, password: string): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
    .pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user)
        if (user.id === 1) {
          localStorage.setItem('Admin', "true")
        } else {
          localStorage.setItem('Admin', "false")
        }
        let tokenS = user.token!.toString()
        localStorage.setItem('token', tokenS)
            this.setToken(tokenS)
      })
    )
  }


  public registred(user: User): Observable<User> {
    // return this.http.post<User>(`${environment.apiUrl}/registr`, JSON.stringify(user))
    return this.http.post<User>(`${environment.apiUrl}/users/register`, user)
  }

  private setToken(token: string) {
    this.token = token
  }

  public getToken(): string {
    return this.token
  }

  public isAuthenticated(): boolean {
    return !!this.token
  }

  public logout(): void {
    this.setToken('')
    localStorage.removeItem('token');
    localStorage.removeItem('Admin');
    localStorage.removeItem('user');
    this.userSubject.complete();
    this.router.navigate(['/login'])
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  public getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  public update(id: number, params: User): Observable<JSON> {
    return this.http.put<JSON>(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (+id == this.userValue.id) {
          // Обновление пользователя в LocalStorage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }
}
