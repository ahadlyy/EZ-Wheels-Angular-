import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../Interfaces/register-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:7108/api/user";

  getByRole(role: string) {
    return this.http.get(this.baseUrl + `?role=${role}`);
  }

  getById(id: string) {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  add(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  update(user: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, user);
  }

  updatePassword(passwordObj: any) {
    passwordObj.id = localStorage.getItem('userId');
    return this.http.patch<any>(this.baseUrl, passwordObj);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  
  constructor(public http: HttpClient) { }
}
