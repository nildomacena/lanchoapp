import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import {} from '@types/googlemaps';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    public platform: Platform
    ) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);
    let localizacao = new LatLng(-9.6267811,-35.7355347);
    let position: CameraPosition = {
      target: localizacao,
      zoom: 18,
      tilt: 30
    }
    let markerOptions: MarkerOptions = {
      position: localizacao,
      title: 'Lanchonete'
    };

    if(this.platform.is('cordova') && this.platform.is('mobile')){
      map.one(GoogleMapsEvent.MAP_READY)
        .then(_ => {
          map.moveCamera(position);
          map.addMarker(markerOptions)
            .then( (marker:Marker) => {
              marker.showInfoWindow();
            })
          console.log('Map is ready');
        })
    }
    else{ 
      let mapJavascript: google.maps.Map;
      let latLng = new LatLng(-9.6267811,-35.7355347);
      let mapOptions: google.maps.MapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false
      }
      mapJavascript = new google.maps.Map(element, mapOptions);
      let markerOptions: google.maps.MarkerOptions = {
        position: latLng,
        animation: google.maps.Animation.DROP,
        map: mapJavascript
      }
      let markerJavascript = new google.maps.Marker(markerOptions);
    }
    
  }
  
}
