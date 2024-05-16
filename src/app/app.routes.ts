import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReservationDetailsComponent } from './Components/reservation-details/reservation-details.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'reservations/:reservationNumber', component: ReservationDetailsComponent },
    { path:'profile/:id', component:ProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }]