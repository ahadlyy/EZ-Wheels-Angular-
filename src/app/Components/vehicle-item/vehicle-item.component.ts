
import { CarService } from './../../Services/car.service';
import { Component, Input, OnInit,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Car} from '../../Interfaces/car';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent implements OnChanges{
  @Output() rentedCar:EventEmitter<Car> = new EventEmitter<Car>();

  @Input() data:Car = {} as Car;

  @Input() mode:string | null="";
  
  transmission:any;
 
  constructor(
    private _carService: CarService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ){}

ngOnChanges(changes: SimpleChanges): void {
  this.transmission = this.data.transmission;

}
 


  delete(){
    this._carService.deleteCar(this.data.plateNumber).subscribe({
      next:(res)=>{
        this._snackBar.open("Alert", "Car Deleted Successfully",{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:2000,
        });
      },
      error:(err)=>{console.log(err);
      }
    });
  }
  rentCar(){
    this.rentedCar.emit(this.data);
  }
}
