import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { LoginUser } from '../Interfaces/login-user';
import { RegisterUser } from '../Interfaces/register-user';
import { OutputUser } from '../Interfaces/output-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  User: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl = "http://localhost:5156/api/account/";
  authGateBackendUrl = "http://localhost:3000";

  readonly clientID: string = "db5edd9f-133a-47fd-ad73-1fadb9a735a3";
  readonly clientSECRET: string = "e984c5b4-0126-4d07-9cd9-1c461992b9a7";

  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "register", user);
  }

  logIn(user: LoginUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "login", user);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.User.next(null);
  }

  setCredentials(token: string, user: any) {
    localStorage.setItem("token", `${token}`);
    this.User.next(JSON.parse(user));
    localStorage.setItem("userId", this.User.value.id);
  }

  loginWithAuthGate(): Observable<any> {
    const clientCredentials: any = {
      clientID: this.clientID,
      clientSECRET: this.clientSECRET
    }
    return this.http.post<any>(this.authGateBackendUrl + "/tenants/authorize-client", clientCredentials)
  }

  exchangeCodeWithToken(authCode: string): Observable<any> {
    const authCodeObj: any = {
      authCode: authCode
    }
    return this.http.post<any>(this.baseUrl + "codeWithToken", authCodeObj);
  }

  constructor(public http: HttpClient, private userService: UserService) {
    if (localStorage.getItem("userId")) {
      const userId = `${localStorage.getItem("userId")}`;
      this.userService.getById(userId).subscribe({
        next: (response) => {
          this.User.next(response);
        }
      })
    }
  }
}