import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GeolocationComponent } from '../../../Components/geolocation/geolocation.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
