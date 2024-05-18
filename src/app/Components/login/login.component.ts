import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  logIn(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.logIn(formGroup.value).subscribe({
        next: (response) => {
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
