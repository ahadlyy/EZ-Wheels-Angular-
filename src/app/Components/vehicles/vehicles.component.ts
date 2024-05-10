import { CarService } from './../../Services/car.service';
import { VehicleItemComponent } from './../vehicle-item/vehicle-item.component';
import { Component, OnInit } from '@angular/core';
import { Car,StateEnum,TransmissionEnum,TypeEnum } from '../../Interfaces/car';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleItemComponent,CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit{
  cars:Car[] = [];
  totalCount:number = 0;
  numberOfPages:number[] = [];
  itemsInPage:number = 6;
  currentPageIndex:number = 1;

  constructor(private _carService:CarService){};

  ngOnInit(): void {
    this.getCarsData(1);
  }

  getCarsData(page:number){
    this._carService.getCars(page,this.itemsInPage).subscribe({
      next:(res)=>{
        this.cars = res.data;
        this.totalCount=res.totalCount;
        let Pages = Math.ceil((this.totalCount)/this.itemsInPage);
        this.numberOfPages=[];
        for(let i =0;i<Pages;i++){
          this.numberOfPages.push(i+1);
        }
      }
    });
  }
  
  changePage(page:number){
    this.getCarsData(page);
    this.currentPageIndex=page;
  }

  next(){
    if(this.currentPageIndex < this.numberOfPages.length){
      this.getCarsData(this.currentPageIndex+1);
      this.currentPageIndex++;
    }
  }

  prev(){
    if(this.currentPageIndex > 1){
      this.getCarsData(this.currentPageIndex-1);
      this.currentPageIndex--;
    }
  }

  filterForm = new FormGroup({
    make : new FormControl(),
    color : new FormControl(),
    maxRentalPrice : new FormControl(),
    minRentalPrice : new FormControl(),
    priceOrder : new FormControl(),
    model : new FormControl(),
    variant : new FormControl(),
    numberOfPassengers : new FormControl(),
    state : new FormControl(),
    transmission : new FormControl(),
    type : new FormControl()
  });
}

