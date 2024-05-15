import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
interface CustomGeoJson {
  type: 'FeatureCollection';
  features: CustomFeature[];
}

interface CustomFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    id: number;
    timestamp: string;
    imsi: string;
    value: number;
    legendIndex: number;
    color: string;
  };
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private mapData: HttpClient) {}

  // Variables
  map: any;
  data: any;
  layers: any = {};
 

  ngOnInit(): void {
    this.convertJSONToObject();
    this.configMap();
  }

  convertJSONToObject() {
    this.mapData
      .get('assets/map-points.json')
      .pipe(
        map((data: any) => {
          const jsonObject = JSON.parse(JSON.stringify(data));
          return jsonObject;
        })
      )
      .subscribe((jsonObject: any) => {
        this.data = jsonObject;
        this.convertToGeoJSON();
        console.log(this.data.legends);
      });
  }



  convertToGeoJSON() {
    const features: CustomFeature[] = this.data.points.map((point: any) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude],
      },
      properties: {
        id: point.id,
        timestamp: point.timestamp,
        imsi: point.imsi,
        value: point.value,
        legendIndex: point.legendIndex,
        color: point.color,
      },
    }));

    
    const geojson: CustomGeoJson = {
      type: 'FeatureCollection',
      features: features,
    };

    L.geoJSON(geojson, {
      pointToLayer: (feature: any, latlng: any) => {
        return L.circleMarker(latlng, {
          radius: 5,
          color: feature.properties.color,
          fillOpacity: 1,
        });
      },
      onEachFeature: (feature: any, layer: any) => {
        const popupContent = `
          <b></b> ${feature.properties.value}
        `;
        layer.bindPopup(popupContent);
        layer.on('mouseover', () => {
          layer.openPopup();
        });
        layer.on('mouseout', () => {
          layer.closePopup();
        });
      },
    }).addTo(this.map);
  

  }


  // Configuring the map
  configMap() {
    this.map = L.map('map', {
      center: [13.443523695800285, -16.66831514231296],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(this.map);

    // Google Streets layer
    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    this.layers['Google Streets'] = googleStreets;

    // Satellite layer
    const googleSatellite = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    this.layers['Google Satellite'] = googleSatellite;
    L.control.layers(this.layers).addTo(this.map);
    googleSatellite.addTo(this.map);
  }
  
}
