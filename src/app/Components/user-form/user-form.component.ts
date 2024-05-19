import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    age: new FormControl(),
    phoneNumber: new FormControl()
  });
  userId: string | null = null;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _snackBar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getById(this.userId).subscribe(user => {
        this.userForm.patchValue(user)
      });
    }
  }
  onSubmit(formGroup:FormGroup): void {
    if (this.userForm.valid) {
      if (this.userId) {
        this.userService.update(formGroup.value).subscribe({
          next:() => {
          this._snackBar.open("Alert", "User is Updated Successfully!",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        },
        error:(err) => {
          this._snackBar.open("Error", "there was an error updating the user",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
          console.log(err);
        }
      });
      } else {
        console.log(formGroup);
        this.userService.add(formGroup.value).subscribe({
          next:() => {
          this._snackBar.open("Alert", "User is Added Successfully!",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        },
        error:() => {
          this._snackBar.open("Error", "there was an error adding the user",{
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:2000,
          });
        }
      });
      }
    }
  }
  
  
}
