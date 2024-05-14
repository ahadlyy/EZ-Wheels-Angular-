import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../Interfaces/register-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:7108/api/user";

  getByRole(role: string) {
    return this.http.get(this.baseUrl + `?role=${role}`);
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  add(user: RegisterUser) {
    return this.http.post<any>(this.baseUrl, user);
  }

  update(user: RegisterUser) {
    return this.http.put<any>(this.baseUrl, user);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  
  constructor(public http: HttpClient) { }
}
