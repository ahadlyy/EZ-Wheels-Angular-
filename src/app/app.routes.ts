import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { GeolocationComponent } from './Components/geolocation/geolocation.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReservationDetailsComponent } from './Components/reservation-details/reservation-details.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RentComponent } from './Components/rent/rent.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'vehicles', component: VehiclesComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'reservations/:reservationNumber', component: ReservationDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: RentComponent,
    children: [
      { path: 'vehicles', component:VehiclesComponent, outlet: 'vehiclesContent' },
      { path: 'map', component:GeolocationComponent, outlet: 'mapContent' }
    ]
  }
];