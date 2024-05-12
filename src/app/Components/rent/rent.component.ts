import { Component } from '@angular/core';
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



@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [RouterModule, CommonModule,VehiclesComponent,GeolocationComponent,MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonToggleModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
activeTab: string = 'renting';

  showContent(tab: string) {
    this.activeTab = tab;
  }
}
