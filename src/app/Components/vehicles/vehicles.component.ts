import { VehicleItemComponent } from './../vehicle-item/vehicle-item.component';
import { Component } from '@angular/core';
import { Car,StateEnum,TransmissionEnum,TypeEnum } from '../../Interfaces/car';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleItemComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  cars:Car[] = [
    {PlateNumber:"asd",ChassisNumber:"chasing",Make:"ford",Color:"red",RentalPrice:250,Model:"sa",Variant:"se",Mileage:55,NumberOfPassengers:4,State:StateEnum.Rented,Transmission:TransmissionEnum.Automatic,Type:TypeEnum.Hatchback},
    {PlateNumber:"asd",ChassisNumber:"chasing",Make:"ford",Color:"red",RentalPrice:250,Model:"sa",Variant:"se",Mileage:55,NumberOfPassengers:4,State:StateEnum.Rented,Transmission:TransmissionEnum.Automatic,Type:TypeEnum.Hatchback},
    {PlateNumber:"asd",ChassisNumber:"chasing",Make:"ford",Color:"red",RentalPrice:250,Model:"sa",Variant:"se",Mileage:55,NumberOfPassengers:4,State:StateEnum.Rented,Transmission:TransmissionEnum.Automatic,Type:TypeEnum.Hatchback},
    {PlateNumber:"asd",ChassisNumber:"chasing",Make:"ford",Color:"red",RentalPrice:250,Model:"sa",Variant:"se",Mileage:55,NumberOfPassengers:4,State:StateEnum.Rented,Transmission:TransmissionEnum.Automatic,Type:TypeEnum.Hatchback},
    {PlateNumber:"asd",ChassisNumber:"chasing",Make:"ford",Color:"red",RentalPrice:250,Model:"sa",Variant:"se",Mileage:55,NumberOfPassengers:4,State:StateEnum.Rented,Transmission:TransmissionEnum.Automatic,Type:TypeEnum.Hatchback},
  ];
  constructor(){};


}
