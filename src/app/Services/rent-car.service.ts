import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentCar } from '../Interfaces/rent-car';

@Injectable({
  providedIn: 'root'
})
export class RentCarService {
  baseUrl:string = `https://localhost:7108/api/Rent`;
  constructor(private _http:HttpClient) { }

  getAll(pageNumber:number = 1,pageSize:number = 10):Observable<any>{
    return this._http.get(`${this.baseUrl}/${pageNumber}/${pageSize}`);
  }

  getById(id:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  Create(rent:RentCar):Observable<any>{
    return this._http.post(`${this.baseUrl}`,rent);
  }

  update(rent:RentCar):Observable<any>{
    return this._http.patch(`${this.baseUrl}`,rent);
  }

  delete(id:string):Observable<any>{
    return this._http.delete(`${this.baseUrl}?id=${id}`);
  }
}
