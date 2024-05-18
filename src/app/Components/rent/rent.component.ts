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
import { PaymentComponent } from '../payment/payment.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-rent',
  standalone: true,

  imports: [RouterModule, CommonModule, VehiclesComponent, RentComponent, GeolocationComponent,
            MatButtonToggleModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, 
            MatFormFieldModule,FormsModule, MatButtonModule,PaymentComponent],


  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {
  isPaid:boolean = false;
  rentalPriceDay: number | any;
  totalPrice: number | any;
 constructor(
  private authService: AuthenticationService,
   private rentCarService: RentCarService,
   private _snackBar: MatSnackBar
  ) { }
 rent: RentCar = {
        reservationNumber:"",
        startingDate: new Date(),
        endingDate: new Date(),
        pickUpLatitude:  0,
        pickUpLongitude:  0,
        dropOffLatitude:  0,
        dropOffLongitude:  0,
        customerName: "",
        customerId: "",
        plateNumber: "",
        make: "",
        model: "",
        isOnlinePaid:true,
        isInProgress:true,
        numberOfRentDays:0,
        totalRentPrice:0
    };
    

    ngOnInit(): void {
    this.authService.User.subscribe((user) => {
      this.rent.customerName = user?.userName;
      this.rent.customerId = user?.id;
    });
  }

  dateFilter = (todayDate: Date | null): boolean => {
    if (!todayDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return todayDate >= today;
  }

activeTab: string = 'renting';
  showContent(tab: string) {
    this.activeTab = tab;
  }

 calculateTotalPrice(startDate: Date, endDate: Date, price:number|any): number {
    const Day = 24 * 60 * 60 * 1000; 
    const diffInSec = endDate.getTime() - startDate.getTime();
    const rentingDays = Math.round(diffInSec / Day);
    const Tprice = rentingDays * price;
    return Tprice;
}

  onLocationSelected(location: { latitude: number, longitude: number }) {
    this.rent.pickUpLatitude = location.latitude;
    this.rent.pickUpLongitude = location.longitude;
    if(this.rent.pickUpLatitude && this.rent.pickUpLongitude){
      this._snackBar.open("Alert", "PickUp location selected!",{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:2000,
    });
    }
    this.rent.dropOffLatitude = location.latitude; 
    this.rent.dropOffLongitude = location.longitude;
    this._snackBar.open("Alert", "DropOff location selected!",{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:2000,
    });
  }

  cash(event:any){
    this.isPaid = true;
    this.rent.isOnlinePaid = event.value;
  }

  RentCarSelected(selectedCars: Car) {
    this.rent.model = selectedCars.model;
    this.rent.make = selectedCars.make;
    this.rent.plateNumber = selectedCars.plateNumber;
    this._snackBar.open("Alert", "Car selected Successfully!",{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:2000,
    });
    let rentalPriceDay: number | any = selectedCars.rentalPrice ; 
    let totalPrice: number | any = this.calculateTotalPrice(this.rent.startingDate, this.rent.endingDate, rentalPriceDay);
    console.log(rentalPriceDay)
    console.log(totalPrice)
  }  

  saveRent(){
    this.rentCarService.Create(this.rent).subscribe({
      next: (response) => {
        this._snackBar.open("Alert", "Renting order has been placed Successfully",{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:3000,
        });
      },
      error:(err)=>{
        this._snackBar.open("Alert", "something went wrong placing your rent order",{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:3000,
        });
      }
    });
  }
}
