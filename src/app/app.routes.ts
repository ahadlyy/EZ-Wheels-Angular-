import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { GeolocationComponent } from './Components/geolocation/geolocation.component';

export const routes: Routes = [
    {path:'vehicles',component:VehiclesComponent},
    {path:'map',component:GeolocationComponent}
];
