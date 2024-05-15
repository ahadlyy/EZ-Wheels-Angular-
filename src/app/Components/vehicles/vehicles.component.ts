import { CarService } from './../../Services/car.service';
import { VehicleItemComponent } from './../vehicle-item/vehicle-item.component';
import { Component, OnInit } from '@angular/core';
import { Car,StateEnum,TransmissionEnum,TypeEnum } from '../../Interfaces/car';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleItemComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit{
  cars:Car[] = [];
  totalCount:number = 0;
  numberOfPages:number[] = [];
  itemsInPage:number = 6;
  currentPageIndex:number = 1;
  currentFilterForm : any ;
  colors:string[] = [];
  makers:string[] = [];
  constructor(private _carService:CarService){};

  ngOnInit(): void {
    
    this.getCarsData(1);
    this._carService.getColors().subscribe({
      next:(res)=>{
        this.colors = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this._carService.getMakers().subscribe({
      next:(res)=>{
        this.makers = res.data;
      },
    });
  }
  resetFilters(){
    this.currentFilterForm = null;
    this.getCarsData(1);
    this.filterForm.reset();
  }

  getCarsData(page:number,form?:FormGroup){

    this._carService.getCars(page,this.itemsInPage,form?.value).subscribe({
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
    this.getCarsData(page,this.currentFilterForm);
    this.currentPageIndex=page;
  }

  next(){
    if(this.currentPageIndex < this.numberOfPages.length){
      this.getCarsData(this.currentPageIndex+1,this.currentFilterForm);
      this.currentPageIndex++;
    }
  }

  prev(){
    if(this.currentPageIndex > 1){
      this.getCarsData(this.currentPageIndex-1,this.currentFilterForm);
      this.currentPageIndex--;
    }
  }

  filterForm = new FormGroup({
    make : new FormControl(''),
    color : new FormControl(''),
    maxRentalPrice : new FormControl(''),
    minRentalPrice : new FormControl(''),
    priceOrder : new FormControl(''),
    model : new FormControl(''),
    variant : new FormControl(''),
    numberOfPassengers : new FormControl(''),
    state : new FormControl(''),
    transmission : new FormControl(''),
    type : new FormControl('')
  });


  filter(form: FormGroup){
    this.currentPageIndex=1;
    Object.keys(form.controls).forEach(el=>{
      if(!form.get(el)?.value){
        form.get(el)?.setValue('');
      }
    });
    this.getCarsData(this.currentPageIndex,form);
    this.currentFilterForm = form;
  }
}

