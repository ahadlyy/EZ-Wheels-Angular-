import { Component } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  constructor(private _carService:CarService){}



  newCarForm = new FormGroup({
    PlateNumber : new FormControl(''),
    ChassisNumber : new FormControl(''),
    Make : new FormControl(''),
    Color : new FormControl(''),
    RentalPrice : new FormControl(''),
    Model : new FormControl(''),
    Variant : new FormControl(''),
    NumberOfPassengers : new FormControl(''),
    Transmission : new FormControl(''),
    Type : new FormControl('')
  });


  submit(form:FormGroup){
    if(form.valid){
      //console.log(form.value);
      
      this._carService.addCar(form.value).subscribe({
        next:(res)=>console.log(res),
        error:(err)=>console.log(err)
      });
    }
  }
}
