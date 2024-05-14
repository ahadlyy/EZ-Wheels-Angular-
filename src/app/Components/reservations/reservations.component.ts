import { CarService } from './../../Services/car.service';
import { RentCar } from './../../Interfaces/rent-car';
import { RentCarService } from './../../Services/rent-car.service';
import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {
  sub: Subscription | null = null;
  @Input() plateNumber: string|null = null;
  reservations: RentCar[] = [
    // {ReservationNumber:"567",PlateNumber:"123",
    //   StartingDate:new Date(2000), EndingDate: new Date(2024),
    //   PickUpLatitude: 123, DropOffLatitude: 123, PickUpLongitude: 123, DropOffLongitude:123,
    //   CustomerId:"123", CustomerName:"ahmed", Make: "BMW", Model: "123"
    // },
  ];

  selectedReservation: RentCar | null = null;
  constructor(private rentCarService: RentCarService,private carService: CarService, private router:Router){}
  ngOnInit(): void {
     this.rentCarService.getAll().subscribe({
      next: res => this.reservations = res.data,
      error: err=> console.log(err)
    });
    if(this.plateNumber != null)
      this.sub = this.carService.getCarReservations(this.plateNumber).subscribe(reservations => this.reservations = reservations);
  }
  showDetails(id:string) {
    console.log(id)
    this.router.navigate(['/reservations', id]);
  }
  // ngOnDestroy(): void {
  //   this.sub?.unsubscribe();
  // }
}
