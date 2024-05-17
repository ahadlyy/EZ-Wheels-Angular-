import { Component, OnInit } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../Interfaces/car';

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
  constructor(private _carService:CarService,private _activatedRoute:ActivatedRoute,private _router:Router){
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
    plateNumber : new FormControl(),
    chassisNumber : new FormControl(),
    make : new FormControl(),
    color : new FormControl(),
    rentalPrice : new FormControl(),
    mileage : new FormControl(),
    model : new FormControl(),
    variant : new FormControl(),
    numberOfPassengers : new FormControl(),
    transmission : new FormControl(),
    type : new FormControl(),
    state : new FormControl()
  });


  submit(form:FormGroup){
    if(form.valid){
      //console.log(form.value);
      this._carService.editCar(this.carId,form.value).subscribe({
        next:(res)=>{
          console.log(res);
          // this._router.navigate(['/vehicles']);
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
        
        this._carService.uploadCarPhoto(this.carId,formData).subscribe({
          next:(res)=>{
            this.car.photoUrl = res.photoUrl;
          },
          error:(err)=>{console.log(err)}
        })
      }
  }
}
