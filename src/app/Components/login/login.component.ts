import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  logIn(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.logIn(formGroup.value).subscribe({
        next: (response) => {
          console.log(response); //
          const token = JSON.stringify(response.token);
          const user = JSON.stringify(response.user);
          this.authService.setCredentials(token, user);
          if (this.authService.User.value != null) {
            this.router.navigate(["/"]);
          }
        }
      })
    }
  }

  constructor(public authService: AuthenticationService, public router: Router) { }
}
