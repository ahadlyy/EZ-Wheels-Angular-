import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../Interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://localhost:7108/api/Car';

  getCarById(plateNumber: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${plateNumber}`);
  }

  getCars(pageNumber: number, pageSize: number, filter: any): Observable<Car[]> {
    let params = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString(), ...filter };
    return this.http.get<Car[]>(`${this.baseUrl}`, { params });
  }

  getCarReservations(plateNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${plateNumber}/reservations`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.baseUrl, car);
  }

  editCar(plateNumber: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/${plateNumber}`, car);
  }

  deleteCar(plateNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${plateNumber}`);
  }
  constructor(public http: HttpClient) { }
}