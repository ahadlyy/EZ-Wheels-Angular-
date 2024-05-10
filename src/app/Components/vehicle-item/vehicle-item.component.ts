import { Component, Input, OnInit } from '@angular/core';
import { Car, TransmissionEnum,StateEnum,TypeEnum} from '../../Interfaces/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent implements OnInit{
  TransmissionEnum=TransmissionEnum;
  StateEnum=StateEnum;
  TypeEnum=TypeEnum;
  @Input() data:Car = {} as Car;

  constructor(){
    
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
