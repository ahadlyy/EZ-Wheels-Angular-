import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../Interfaces/car';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://localhost:7108/api/Car';

  getCarById(plateNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${plateNumber}`);
  }

  getCars(pageNumber: number=1, pageSize: number=100, filter?: any): Observable<any> {
    // let params = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString(), ...filter };
    return this.http.get(`${this.baseUrl}/${pageNumber},${pageSize}`, { params:{...filter} });
  }

  getColors():Observable<any>{
    return this.http.get(`${this.baseUrl}/colors`);
  }

  getMakers():Observable<any>{
    return this.http.get(`${this.baseUrl}/make`);
  }

  getCarReservations(plateNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${plateNumber}/reservations`);
  }

  addCar(form: Car): Observable<any> {
    console.log(form);
    
  
    return this.http.post(this.baseUrl, form);
  }

  editCar(plateNumber: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/${plateNumber}`, car);
  }

  deleteCar(plateNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${plateNumber}`);
  }
  constructor(public http: HttpClient) { }
}
