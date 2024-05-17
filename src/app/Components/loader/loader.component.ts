import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})

export class LoaderComponent {
  isLoading:boolean = false;
  sub:Subscription = new Subscription();
  constructor(public loader: LoaderService) { 
    this.sub = this.loader.loading.subscribe(loader => {this.isLoading =loader      
    });
  }
}