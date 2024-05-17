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
import { EditCarComponent } from './Components/edit-car/edit-car.component';
import { NotFoundComponent } from './Core/not-found/not-found.component';
import { AdminUsersComponent } from './Components/admin-users/admin-users.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { canloginGuard } from './guards/canlogin.guard';
import { ManageBookingsComponent } from './Components/manage-bookings/manage-bookings.component';
import { isAdminGuard } from './guards/is-admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate:[canloginGuard, isAdminGuard] },
    { path:'car-details/:id',component:CarDetailsComponent},
    { path:'add-car',component:AddCarComponent, canActivate:[canloginGuard] },
    { path:'edit-car/:id',component:EditCarComponent, canActivate:[canloginGuard] },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reservations', component: ReservationsComponent, canActivate:[canloginGuard] },
    { path: 'reservations/:reservationNumber', component: ReservationDetailsComponent, canActivate:[canloginGuard] },
    { path:'profile', component:ProfileComponent, canActivate:[canloginGuard]},
    { path:'users', component:AdminUsersComponent },
    { path:'users/update/:id', component:UserFormComponent },
    { path:'users/add', component:UserFormComponent },
    { path: 'managebookings', component:ManageBookingsComponent, canActivate:[canloginGuard]},
    {
        path: '',
        component: RentComponent,
        children: [
            { path: 'vehicles', component: VehiclesComponent, outlet: 'vehiclesContent' },
            { path: 'map', component: GeolocationComponent, outlet: 'mapContent' }
        ]
    },
    {
        path:"**",component:NotFoundComponent
    }
];

