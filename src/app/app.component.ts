import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Core/Header/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeolocationComponent } from './Components/geolocation/geolocation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomeComponent,GoogleMapsModule,GeolocationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EzWheels';
}
