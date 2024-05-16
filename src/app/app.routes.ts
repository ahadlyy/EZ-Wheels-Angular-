import { Routes } from '@angular/router';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';
import { Component } from '@angular/core';
import { AddCarComponent } from './Components/add-car/add-car.component';
import { EditCarComponent } from './Components/edit-car/edit-car.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'vehicles',component:VehiclesComponent},
    {path:'register',component:RegisterComponent},
    {path:'car-details/:id',component:CarDetailsComponent},
    {path:'add-car',component:AddCarComponent},
    {path:'edit-car/:id',component:EditCarComponent},
];
