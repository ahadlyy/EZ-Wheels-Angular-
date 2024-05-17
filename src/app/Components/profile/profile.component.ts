import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  updateUserForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    phoneNumber: new FormControl()
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

  ngOnInit(): void {
    this.updateUserForm.patchValue(this.authService.User.value);
  }

  constructor(public userService: UserService, public authService: AuthenticationService, public activatedRoute: ActivatedRoute) { }
}
