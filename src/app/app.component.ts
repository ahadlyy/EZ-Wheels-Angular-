import { FooterComponent } from './Core/Footer/footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Core/Header/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { LoaderComponent } from './Components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent,RouterOutlet,HeaderComponent, LoginComponent, RegisterComponent,FooterComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'EzWheels';
}
