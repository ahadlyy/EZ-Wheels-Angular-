import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car, TransmissionEnum,StateEnum,TypeEnum} from '../../Interfaces/car';
import { CommonModule } from '@angular/common';
import { RentCar } from '../../Interfaces/rent-car';

@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent implements OnInit{
  @Output() rentedCar:EventEmitter<Car> = new EventEmitter<Car>();
  TransmissionEnum=TransmissionEnum;
  StateEnum=StateEnum;
  TypeEnum=TypeEnum;
  @Input() data:Car = {} as Car;
  constructor(){}

  ngOnInit(): void {
    //console.log(this.data);
  }

  rentCar(){
    this.rentedCar.emit(this.data);
  }
}
