import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any;
  updateUserForm = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    phoneNumber: new FormControl()
  });

  submitUserInfo(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this.userService.update(formGroup.value).subscribe({
        next: (response) => {
          this.authService.User = response;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  constructor(public userService: UserService, public authService: AuthenticationService, public activatedRoute: ActivatedRoute) {
    console.log("constructor");
    
    this.user = this.authService.User.value;
    this.updateUserForm.patchValue(this.user);
   }
}
