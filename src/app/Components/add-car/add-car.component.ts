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
  transValue:number = 0;
  constructor(private _carService:CarService){}



  newCarForm = new FormGroup({
    plateNumber : new FormControl(''),
    chassisNumber : new FormControl(''),
    make : new FormControl(''),
    color : new FormControl(''),
    rentalPrice : new FormControl(''),
    model : new FormControl(''),
    variant : new FormControl(''),
    numberOfPassengers : new FormControl(''),
    transmission : new FormControl<number>(0),
    // type : new FormControl('')
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
