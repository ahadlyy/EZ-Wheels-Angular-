import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Interfaces/login-user';
import * as jwtdecode from 'jwt-decode';
import { RegisterUser } from '../Interfaces/register-user';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  User:any;
  isAuthenticated = false;
  baseUrl = "https://localhost:7108/api/account/";

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

  logIn(user: LoginUser) : Observable<any>{
    console.log(user);
    
    return this.http.post<any>(this.baseUrl+"login", user);
    
    
    //.subscribe({
      // next: (response) => {
      //   this.isAuthenticated = true;
      //   localStorage.setItem("token", response.token);
      //   let claims:{Name:string, NameIdentifier:string, Jti:string} = jwtdecode.jwtDecode(response);
      //   localStorage.setItem("username", claims.Name);
      //   localStorage.setItem("id", claims.NameIdentifier);
      //   localStorage.setItem("tokenId", claims.Jti);
      //}
    //});
  }

  setCredentials(token:string, user:any) {
    //this.User = jwtdecode.jwtDecode(JSON.parse(token));
    localStorage.setItem("token", `${token}`);
    this.User = JSON.parse(user);
    console.log(this.User);
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