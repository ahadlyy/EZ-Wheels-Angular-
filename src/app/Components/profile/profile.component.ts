import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  updateUserForm = new FormGroup({
    userName: new FormControl( this.authService.User.value.userName ),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl(this.authService.User.value.email),
    age: new FormControl(this.authService.User.value.age),
    phone: new FormControl(this.authService.User.value.phone)
  });

  submitUserInfo(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this.userService.update(formGroup.value).subscribe({
        next: (response) => {
          console.log(response);
          this.authService.User = response;
          console.log(this.authService.User);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  constructor(public userService: UserService, public authService: AuthenticationService) { }
}
