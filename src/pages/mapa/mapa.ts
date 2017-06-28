import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

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
    public googleMaps: GoogleMaps
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
  
}
