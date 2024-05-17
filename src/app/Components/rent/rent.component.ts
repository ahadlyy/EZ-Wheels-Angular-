import { Component, NgModule, OnInit } from '@angular/core';
import { GeolocationComponent } from '../geolocation/geolocation.component';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { RentCar } from '../../Interfaces/rent-car';
import { CarService } from '../../Services/car.service';
import { Car } from '../../Interfaces/car';
import { AuthenticationService } from '../../Services/authentication.service';
import { LoginUser } from '../../Interfaces/login-user';
import { RegisterUser } from '../../Interfaces/register-user';
import { UserService } from '../../Services/user.service';
import { RentCarService } from '../../Services/rent-car.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [RouterModule, CommonModule, VehiclesComponent, RentComponent, GeolocationComponent,
            MatButtonToggleModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, 
            MatFormFieldModule,FormsModule, MatButtonModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {
  loggedInUser: LoginUser | any;
 constructor(
  private authService: AuthenticationService,
   private rentCarService: RentCarService,
   private _snackBar: MatSnackBar
  ) { }
 rent: RentCar = {
        ReservationNumber:"",
        StartingDate: new Date(),
        EndingDate: new Date(),
        PickUpLatitude:  0,
        PickUpLongitude:  0,
        DropOffLatitude:  0,
        DropOffLongitude:  0,
        CustomerName: "",
        CustomerId: "",
        PlateNumber: "",
        Make: "",
        Model: "",
        IsOnlinePaid:true,
        IsInProgress:true,
        NumberOfRentDays:0,
        TotalRentPrice:0
    };

    ngOnInit(): void {
    this.authService.User.subscribe((user) => {
      this.rent.CustomerName = user?.userName;
      this.rent.CustomerId = user?.id;
      
      
    });
  }

activeTab: string = 'renting';
  showContent(tab: string) {
    this.activeTab = tab;
  }

  onLocationSelected(location: { latitude: number, longitude: number }) {
    this.rent.PickUpLatitude = location.latitude;
    this.rent.PickUpLongitude = location.longitude;
    this.rent.DropOffLatitude = location.latitude; 
    this.rent.DropOffLongitude = location.longitude;
    console.log(location);
    console.log(this.rent);
    this._snackBar.open("Alert", "location selected!",{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:2000,
    });
  }

  RentCarSelected(selectedCars: Car) {
    this.rent.Model = selectedCars.model;
    this.rent.Make = selectedCars.make;
    this.rent.PlateNumber = selectedCars.plateNumber;
    console.log(this.authService.User.value.userName);
    this.rentCarService.Create(this.rent).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }  
}
