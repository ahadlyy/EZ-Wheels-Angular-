import { RentCarService } from './../../Services/rent-car.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentCar } from '../../Interfaces/rent-car';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit, OnDestroy{
  reservation : any[] | null = null;
  sub: Subscription | null = null;
  innerSub: Subscription | null = null;
  deleteSub: Subscription | null = null;
  constructor(private activatedRoute: ActivatedRoute,private  rentCarService: RentCarService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe({next: (data)=>{
      this.innerSub = this.rentCarService.getById(data['reservationNumber']).subscribe(res=>{this.reservation = res.data})
      }})
      
    }

  deleteReservation(){
    if(this.reservation != null)
      this.deleteSub = this.rentCarService.delete(this.reservation[0]?.ReservationNumber).subscribe();
  }
  ngOnDestroy(){
    this.sub?.unsubscribe();
    this.innerSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }
}
