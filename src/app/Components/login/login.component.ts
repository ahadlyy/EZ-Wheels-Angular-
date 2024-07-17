import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  authCode: string | null = null;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  constructor(public authService: AuthenticationService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.authCode = params.get('authCode');
      if (this.authCode) {
        this.exchangeCodeWithToken(this.authCode);
      }
    })
  }

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

  loginWithAuthGate() {
    this.authService.loginWithAuthGate().subscribe({
      next: (response) => {
        const authgateLoginPage: string = response.data.callbackUrl;
        console.log(authgateLoginPage);
        window.location.href = authgateLoginPage;
      }
    })
  }

  exchangeCodeWithToken(authCode: string) { // check whether it is response.token or response.data.token (same for user)
    this.authService.exchangeCodeWithToken(authCode).subscribe({
      next: response => {
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
