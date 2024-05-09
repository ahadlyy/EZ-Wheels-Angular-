import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Interfaces/login-user';
import * as jwtdecode from 'jwt-decode';
import { RegisterUser } from '../Interfaces/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = false;
  baseUrl = "https://localhost:7057/api/account";

  register(user: RegisterUser) {
    this.http.post<any>(this.baseUrl, user).subscribe({
      next: (response) => {
        // router navigation
        console.log("success");
      },
      error: (err) => {
        console.log(err);
      }
  })
}

  logIn(user: LoginUser) {
    this.http.post<any>(this.baseUrl, user).subscribe({
      next: (response) => {
        this.isAuthenticated = true;
        localStorage.setItem("token", response.token);
        let claims:{Name:string, NameIdentifier:string, Jti:string} = jwtdecode.jwtDecode(response);
        localStorage.setItem("username", claims.Name);
        localStorage.setItem("id", claims.NameIdentifier);
        localStorage.setItem("tokenId", claims.Jti);
      }
    });
  }

  logOut() {
    this.isAuthenticated=false;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("tokenId");
  }

  constructor(public http: HttpClient) { }
}