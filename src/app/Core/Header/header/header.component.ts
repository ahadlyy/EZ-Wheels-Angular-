import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication.service';
import { GeolocationComponent } from '../../../Components/geolocation/geolocation.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
constructor(public authService: AuthenticationService) {
  authService.User.subscribe(response => {
    if(response != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  })
 }
}
