import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl:string = ``;
  constructor(private _http:HttpClient) { }


}
