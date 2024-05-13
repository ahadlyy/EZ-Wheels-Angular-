  import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../Services/car.service';
import { Car } from '../../Interfaces/car';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit{
  carId:string  = "";
  car:Car = {} as Car;
  carImg:string[] = ["assets/images/car-bg.jpg","assets/images/chev.png","assets/images/chev.png","assets/images/chev.png","assets/images/chev.png"];
  constructor(private _activatedRoute:ActivatedRoute,private _carService:CarService){}

  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe( params => { 
        this.carId = params.get('id')??""; 
        this._carService.getCarById(this.carId).subscribe({
          next:(res)=>{
            this.car = res.data[0];
            console.log(this.car);
            
          },
        })
      });
  }
}
