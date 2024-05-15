import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { LoginUser } from '../Interfaces/login-user';
import { RegisterUser } from '../Interfaces/register-user';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  User: LoginUser | any;
  @Output() targetUser: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();
  baseUrl = "https://localhost:7108/api/account/";

  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "register", user);
  }

  logIn(user: LoginUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "login", user);
  }

  logOut() {
    localStorage.removeItem("token");
    this.User = null;
  }

  setCredentials(token: string, user: any) {
    localStorage.setItem("token", `${token}`);
    this.User = JSON.parse(user);
  }

  login(user: LoginUser) {
    this.targetUser.emit(user);
  }

  constructor(public http: HttpClient) { }
}