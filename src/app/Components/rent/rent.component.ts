import { Component, NgModule } from '@angular/core';
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


@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [RouterModule, CommonModule, VehiclesComponent, RentComponent, GeolocationComponent,
            MatButtonToggleModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, 
            MatFormFieldModule,FormsModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
 constructor() {}
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

activeTab: string = 'renting';
  showContent(tab: string) {
    this.activeTab = tab;
  }

  onLocationSelected(location: { latitude: number, longitude: number }) {
    this.rent.PickUpLatitude = location.latitude;
    this.rent.PickUpLongitude = location.longitude;
    this.rent.DropOffLatitude = location.latitude; 
    this.rent.DropOffLongitude = location.longitude;
    //console.log(location);
  }

  RentCarSelected(selectedCars: Car) {
    this.rent.Model = selectedCars.model;
    this.rent.Make = selectedCars.make;
    this.rent.PlateNumber = selectedCars.plateNumber;
    //console.log(this.rent);
  }
}
