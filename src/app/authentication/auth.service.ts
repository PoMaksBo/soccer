import { Injectable } from '@angular/core';
import {User} from "../user.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  login(user: User) {
    return this.http.post('url', user)
  }

  // registration(User) {
  //
  // }
}
