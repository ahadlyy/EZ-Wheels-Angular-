import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
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
