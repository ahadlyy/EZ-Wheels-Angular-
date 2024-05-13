import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'vehicles',component:VehiclesComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent}
];