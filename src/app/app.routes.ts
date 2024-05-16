import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { GeolocationComponent } from './Components/geolocation/geolocation.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReservationDetailsComponent } from './Components/reservation-details/reservation-details.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RentComponent } from './Components/rent/rent.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';
import { AddCarComponent } from './Components/add-car/add-car.component';
import { AdminUsersComponent } from './Components/admin-users/admin-users.component';
import { UserFormComponent } from './Components/user-form/user-form.component';

import { canloginGuard } from './guards/canlogin.guard';
import { ManageBookingsComponent } from './Components/manage-bookings/manage-bookings.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate:[canloginGuard] },
    { path:'car-details/:id',component:CarDetailsComponent},
    { path:'add-car',component:AddCarComponent, canActivate:[canloginGuard] },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reservations', component: ReservationsComponent, canActivate:[canloginGuard] },
    { path: 'reservations/:reservationNumber', component: ReservationDetailsComponent, canActivate:[canloginGuard] },
    { path:'profile', component:ProfileComponent, canActivate:[canloginGuard]},
    { path: 'reservations', component: ReservationsComponent },
    { path: 'reservations/:reservationNumber', component: ReservationDetailsComponent },
    { path:'profile', component:ProfileComponent },
    { path:'users', component:AdminUsersComponent },
    { path:'users/update/:id', component:UserFormComponent },
    { path:'users/add', component:UserFormComponent },
    { path:'profile/:id', component:ProfileComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'managebookings', component:ManageBookingsComponent, canActivate:[canloginGuard]},
    {
        path: '',
        component: RentComponent,
        children: [
            { path: 'vehicles', component: VehiclesComponent, outlet: 'vehiclesContent' },
            { path: 'map', component: GeolocationComponent, outlet: 'mapContent' }
        ]
    }
];