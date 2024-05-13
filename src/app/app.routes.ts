import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'vehicles',component:VehiclesComponent},
    {path:'register',component:RegisterComponent},
    {path:'car-details/:id',component:CarDetailsComponent}
];
