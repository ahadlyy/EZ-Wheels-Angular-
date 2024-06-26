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
  //    let token =  `${localStorage.getItem("token")}`;
  //    let  t = JSON.parse(token);
  //    let Bearer = "Bearer ";
  //    const headers = {
  //     "authorization": `Bearer ${t}`
  // };
  // console.log(`Bearer ${token}`);
  
    return this.http.get(`${this.baseUrl}/${pageNumber},${pageSize}`, {
      params:{...filter},
      // headers:headers
  });
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

  editCar(plateNumber: string, car: any): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/${plateNumber}`, car);
  }

  deleteCar(plateNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${plateNumber}`);
  }

  uploadCarPhoto(plateNumber: string,photo:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/photo?plateNumber=${plateNumber}`,photo);
  }
  constructor(public http: HttpClient) { }
}
