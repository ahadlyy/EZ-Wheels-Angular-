import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  updatePasswordForm = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
    confirmNewPassword: new FormControl()
  })

  submitUserPassword(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.userService.updatePassword(formGroup.value).subscribe({
        next: (response) => {
          this.router.navigate(["/profile"]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

constructor (public userService: UserService, public authService: AuthenticationService, public router: Router) { }
}
