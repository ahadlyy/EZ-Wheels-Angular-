import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Core/Footer/footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Core/Header/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

import { LoaderComponent } from './Components/loader/loader.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { GeolocationComponent } from './Components/geolocation/geolocation.component';
import { RentComponent } from './Components/rent/rent.component';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,HeaderComponent, LoginComponent, RegisterComponent,LoaderComponent,
    FooterComponent, HomeComponent,GoogleMapsModule,GeolocationComponent,RentComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'EzWheels';
}
