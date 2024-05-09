import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'vehicles',component:VehiclesComponent},
    {path:'register',component:RegisterComponent}
];
