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
  User: BehaviorSubject<any> = new BehaviorSubject<any>({});
  baseUrl = "https://localhost:7108/api/account/";

  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "register", user);
  }

  logIn(user: LoginUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + "login", user);
  }

  logOut() {
    localStorage.removeItem("token");
    this.User.next(null);
  }

  setCredentials(token: string, user: any) {
    localStorage.setItem("token", `${token}`);
    localStorage.setItem("user", `${this.User.value}`);
    this.User = JSON.parse(user);
    // console.log(this.User);
    
  }

  

  constructor(public http: HttpClient,private userService:UserService) { 
    if(localStorage.getItem("user")){
      let localUSer:string = JSON.parse(`${localStorage.getItem("user")}`);
      this.User.next(localUSer);
      console.log(this.User.value);
      
    }
  }
}