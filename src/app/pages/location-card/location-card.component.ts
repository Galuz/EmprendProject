///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit{
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.ngZone.runOutsideAngular(() => {
      const mapOptions = {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      };

      if (this.mapContainer) {
        this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      }
    });
  }
  ngOnDestroy() {
    // Limpia el mapa cuando el componente se destruye
    if (this.map) {
      this.map = null;
    }
  }
}
