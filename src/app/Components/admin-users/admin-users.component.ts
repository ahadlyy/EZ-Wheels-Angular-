import { Subscription } from 'rxjs';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  employees: any = null;
  clients: any = null;
  sub: Subscription | null = null;
  sub3: Subscription | null = null;
  sub2: Subscription | null = null;
  constructor(private userService:UserService, private router:Router){}
  ngOnInit() {
    this.sub = this.userService.getByRole("Employee").subscribe({
      next: res => this.employees = res,
      error: err=> console.log(err)
    })
    this.sub2 = this.userService.getByRole("Client").subscribe({
      next: res => this.clients = res,
      error: err=> console.log(err)
    })
  }
  deleteUser(id:any) {
    this.sub3 = this.userService.delete(id).subscribe()
    this.router.navigateByUrl('/admin')
  }
}
