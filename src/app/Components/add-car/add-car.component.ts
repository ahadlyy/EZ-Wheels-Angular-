import { Component } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  photoUrl:string="assets/images/car-placeholder.jpg";
  constructor(
    private _carService:CarService,
    private _snackBar: MatSnackBar
  ){}



  newCarForm = new FormGroup({
    plateNumber : new FormControl('',Validators.required),
    chassisNumber : new FormControl('',Validators.required),
    make : new FormControl('',Validators.required),
    color : new FormControl('',Validators.required),
    rentalPrice : new FormControl('',Validators.required),
    mileage : new FormControl('',Validators.required),
    model : new FormControl('',Validators.required),
    variant : new FormControl('',Validators.required),
    numberOfPassengers : new FormControl('',Validators.required),
    transmission : new FormControl('Manual'),
    type : new FormControl('SUV'),
    state : new FormControl('Available')
  });


  submit(form:FormGroup){
    if(form.valid){
      this._carService.addCar(form.value).subscribe({
        next:(res)=>{
          this.plateNumber = res.plateNumber;
          this.carAdded=true;
          this._snackBar.open("Alert", "Car Added Successfully",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        },
        error:(err)=>{
          this._snackBar.open("Problem", "There was a problem adding your car please try again",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        }
      });
    }
  }

  uploadPhoto(event:any){
    const file: File = event.target.files[0];
      if (file){
        let formData = new FormData();
        formData.append('photo',file);
        
        this._carService.uploadCarPhoto(this.plateNumber,formData).subscribe({
          next:(res)=>{console.log(res)
            this.photoUrl = res.photoUrl;
            this._snackBar.open("Alert", "Image Added Successfully",{
              horizontalPosition:'center',
              verticalPosition:'top',
              duration:2000,
            });
          },
          error:(err)=>{this._snackBar.open("Problem", "There was a problem adding your car image please try again",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });}
        })
      }
  }
}
