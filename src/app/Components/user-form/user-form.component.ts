import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    phoneNumber: new FormControl()
  });
  userId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getById(this.userId).subscribe(user => {
        this.userForm.patchValue(user)
        console.log(this.userForm)
      });
    }
  }
  onSubmit(formGroup: FormGroup): void {
    if (formGroup.valid) {
      if (this.userId) {
        this.userService.update(formGroup.value).subscribe(() => {
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.add(formGroup.value).subscribe(() => {
          console.log(formGroup.value);
          this.router.navigate(['/users']);
        });
      }
    }
  }
  
  
}
