import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  register(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.register(formGroup.value).subscribe({
        next:(response) => {
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  constructor(public authService: AuthenticationService, public router: Router) { }
}
