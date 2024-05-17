import { Component, OnInit } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../Interfaces/car';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit{
  carId:string  = "";
  car:Car = {} as Car;
  constructor(
    private _carService:CarService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _snackBar: MatSnackBar){
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( params => { 
      this.carId = params.get('id')??""; 
      this._carService.getCarById(this.carId).subscribe({
        next:(res)=>{
          this.car = res.data[0];
          console.log(this.car);
          this.newCarForm.get('plateNumber')?.setValue(this.car.plateNumber);
          this.newCarForm.get('chassisNumber')?.setValue(this.car.chassisNumber);
          this.newCarForm.get('make')?.setValue(this.car.make);
          this.newCarForm.get('color')?.setValue(this.car.color);
          this.newCarForm.get('rentalPrice')?.setValue(this.car.rentalPrice);
          this.newCarForm.get('mileage')?.setValue(this.car.mileage);
          this.newCarForm.get('model')?.setValue(this.car.model);
          this.newCarForm.get('variant')?.setValue(this.car.variant);
          this.newCarForm.get('numberOfPassengers')?.setValue(this.car.numberOfPassengers);
          this.newCarForm.get('transmission')?.setValue(this.car.transmission);
          this.newCarForm.get('type')?.setValue(this.car.type);
          this.newCarForm.get('state')?.setValue(this.car.state);
          this.newCarForm.get('plateNumber')?.disable();
        },
      })
    });
  }

  newCarForm = new FormGroup({
    plateNumber : new FormControl(''),
    chassisNumber : new FormControl('',Validators.required),
    make : new FormControl('',Validators.required),
    color : new FormControl('',Validators.required),
    rentalPrice : new FormControl('',Validators.required),
    mileage : new FormControl('',Validators.required),
    model : new FormControl('',Validators.required),
    variant : new FormControl('',Validators.required),
    numberOfPassengers : new FormControl('',Validators.required),
    transmission : new FormControl(),
    type : new FormControl(),
    state : new FormControl()
  });


  submit(form:FormGroup){
    if(form.valid){
      this._carService.editCar(this.carId,form.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._snackBar.open("Alert", "Car Update Successfully!",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        },
        error:(err)=>{
          this._snackBar.open("Error", "there was an error updating your car",{
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
        
        this._carService.uploadCarPhoto(this.carId,formData).subscribe({
          next:(res)=>{
            this.car.photoUrl = res.photoUrl;
            this._snackBar.open("Alert", "Photo Update Successfully!",{
              horizontalPosition:'center',
              verticalPosition:'top',
              duration:2000,
            });
          },
          error:(err)=>{
            this._snackBar.open("Error", "there was an error updating your car photo",{
              horizontalPosition:'center',
              verticalPosition:'top',
              duration:2000,
            });
          }
        })
      }
  }
}
