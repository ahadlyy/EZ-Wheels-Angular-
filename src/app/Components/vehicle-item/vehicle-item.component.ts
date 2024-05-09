import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../Interfaces/car';

@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent implements OnInit{
  @Input() data:Car = {} as Car;

  constructor(){
    
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
