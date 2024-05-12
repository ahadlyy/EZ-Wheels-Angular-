import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapAdvancedMarker } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { RentCar } from '../../Interfaces/rent-car';
import { RentCarService } from '../../Services/rent-car.service';

let pickupLocation :number;
let dropoffLocation:number;

interface MapConfig {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  maxZoom?: number;
}

@Component({
  selector: 'app-geolocation',
  standalone: true,
  imports: [RouterOutlet,GoogleMapsModule,CommonModule,MapAdvancedMarker],
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.css'
})

export class GeolocationComponent implements OnInit {
  options: MapConfig = {};
  map: google.maps.Map | undefined;
  markers: google.maps.Marker[] = [];
  pickupLocation: google.maps.LatLngLiteral | undefined;
  dropoffLocation: google.maps.LatLngLiteral | undefined;

  constructor(private rentCarService: RentCarService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      const geoOptions: PositionOptions = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(position => {
        this.options = {
          center: { lat: position.coords.latitude, lng: position.coords.longitude },
          zoom: 20,
          maxZoom: 30
        };
      }, error => {
        console.error('Error getting user location:', error);
        this.options = {
          center: { lat: -31, lng: 147 },
          zoom: 4,
          maxZoom: 20
        };
      });
    } else {
      console.error('Your area is not supported.');
      this.options = {
        center: { lat: -31, lng: 147 },
        zoom: 8,
        maxZoom: 20
      };
    } 
  }
  
  onClick(event: google.maps.MapMouseEvent) {
    if (this.pickupLocation == null) {
        this.pickupLocation = event.latLng!.toJSON();
    } else {
        if (this.dropoffLocation == null) {
            this.dropoffLocation = event.latLng!.toJSON();
        } else {
            this.pickupLocation = event.latLng!.toJSON();
        }
    }
    if (this.pickupLocation != null && this.dropoffLocation != null) {
        this.addMarker(this.pickupLocation,'pickup');
        this.addMarker(this.dropoffLocation,'dropoff');
    }
}

addMarker(location: google.maps.LatLngLiteral, type: 'pickup' | 'dropoff') {
    const rent: RentCar = {
        ReservationNumber: "RES017",
        StartingDate: new Date(),
        EndingDate: new Date(),
        PickUpLatitude: type === 'pickup' ? location.lat : this.pickupLocation?.lat || 0,
        PickUpLongitude: type === 'pickup' ? location.lng : this.pickupLocation?.lng || 0,
        DropOffLatitude: type === 'dropoff' ? location.lat : this.dropoffLocation?.lat || 0,
        DropOffLongitude: type === 'dropoff' ? location.lng : this.dropoffLocation?.lng || 0,
        CustomerName: "Adly",
        CustomerId: "string",
        PlateNumber: "220197",
        Make: "Alfa Romeo",
        Model: "quadrifoglio",
        TotalRentPrice:1000,
        IsOnlinePaid:true,
        IsInProgress:true,
        NumberOfRentDays:10
    };

    if(this.pickupLocation && this.dropoffLocation){
    this.rentCarService.Create(rent).subscribe({
        next: (response) => {
            console.log('Marker added successfully:', response);
        },
        error: (error) => {
            console.error('Error adding marker:', error);
        }
    });
    console.log('Latitude:', location.lat);
    console.log('Longitude:', location.lng);
    }
 }
}
