
import { CarService } from './../../Services/car.service';
import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Car, TransmissionEnum,StateEnum,TypeEnum} from '../../Interfaces/car';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


import { RentCar } from '../../Interfaces/rent-car';


@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent implements OnInit{
  @Output() rentedCar:EventEmitter<Car> = new EventEmitter<Car>();
  TransmissionEnum=TransmissionEnum;
  StateEnum=StateEnum;
  TypeEnum=TypeEnum;
  @Input() data:Car = {} as Car;

  @Input() mode:string | null="";

  constructor(private _carService: CarService,private _router: Router){
    
  }


  ngOnInit(): void {

  }


  delete(){
    this._carService.deleteCar(this.data.plateNumber).subscribe({
      next:(res)=>{this._router.navigate(['/vehicles']);},
      error:(err)=>{console.log(err);
      }
    });
  }
  rentCar(){
    this.rentedCar.emit(this.data);
  }
}
