import { Component } from '@angular/core';
import { RentComponent } from '../rent/rent.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
}
