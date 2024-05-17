import { Component } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  carAdded:boolean = false;
  plateNumber:string="";
  constructor(private _carService:CarService){}



  newCarForm = new FormGroup({
    plateNumber : new FormControl(''),
    chassisNumber : new FormControl(''),
    make : new FormControl(''),
    color : new FormControl(''),
    rentalPrice : new FormControl(''),
    mileage : new FormControl(''),
    model : new FormControl(''),
    variant : new FormControl(''),
    numberOfPassengers : new FormControl(''),
    transmission : new FormControl(''),
    type : new FormControl(''),
    state : new FormControl('')
  });


  submit(form:FormGroup){
    if(form.valid){
      //console.log(form.value);

      this._carService.addCar(form.value).subscribe({
        next:(res)=>{
          this.plateNumber = res.plateNumber;
          console.log(this.plateNumber);
          this.carAdded=true;
        },
        error:(err)=>console.log(err)
      });
    }
  }

  uploadPhoto(event:any){
    const file: File = event.target.files[0];
      if (file){
        let formData = new FormData();
        formData.append('photo',file);
        
        this._carService.uploadCarPhoto(this.plateNumber,formData).subscribe({
          next:(res)=>{console.log(res)},
          error:(err)=>{console.log(err)}
        })
      }
  }
}
