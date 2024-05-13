  import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../Services/car.service';
import { Car, TypeEnum } from '../../Interfaces/car';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';
import { VehicleItemComponent } from '../vehicle-item/vehicle-item.component';

@Component({
  
  selector: 'app-car-details',
  standalone: true,
  imports: [SliderComponent,CommonModule,VehicleItemComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit{
  TypeEnum=TypeEnum;
  carId:string  = "";
  car:Car = {} as Car;
  // carImg:string[] = ["assets/images/car-bg.jpg","assets/images/chev.png","assets/images/chev.png","assets/images/chev.png","assets/images/chev.png"];
  similarCars:Car[] = [];
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _carService:CarService,

  ){}

  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe( params => { 
        this.carId = params.get('id')??""; 
        this._carService.getCarById(this.carId).subscribe({
          next:(res)=>{
            this.car = res.data[0];  
            this._carService.getCars(1,100,{
              make:this.car.make
            }).subscribe({
              next:(res)=>{
                this.similarCars = res.data;
                const carIndex =this.similarCars.findIndex(c=>c.plateNumber==this.car.plateNumber);
                this.similarCars.splice(carIndex,1);
                console.log("similarCars",this.similarCars);
                
              }
            })
          },
        })
      });
      
  }
}
