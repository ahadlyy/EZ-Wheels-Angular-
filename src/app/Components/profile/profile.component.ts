import { Component, Input } from '@angular/core';
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
export class ProfileComponent {
  // updateUserForm = new FormGroup({
  //   userName: new FormControl( this.userToUpdate.UserName ),
  //   password: new FormControl(),
  //   confirmPassword: new FormControl(),
  //   email: new FormControl(this.userToUpdate.Email),
  //   age: new FormControl(this.userToUpdate.Age),
  //   phone: new FormControl(this.userToUpdate.PhoneNumber)
  // });
  updateUserForm!: FormGroup;

  initializeForm() {
    this.updateUserForm = new FormGroup({
      userName: new FormControl(this.userToUpdate.UserName),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      email: new FormControl(this.userToUpdate.Email),
      age: new FormControl(this.userToUpdate.Age),
      phone: new FormControl(this.userToUpdate.PhoneNumber)
    });
  }

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

  sub: Subscription | null = null;
  subHelper: Subscription | null = null;
  userToUpdate: any = null;

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subHelper?.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(
      {
        next: data => this.subHelper = this.userService.getById(data['id']).subscribe(user => {
          this.userToUpdate = user;
          this.initializeForm();
      })
      }
    );
  }

  constructor(public userService: UserService, public authService: AuthenticationService, public activatedRoute: ActivatedRoute) { }
}
