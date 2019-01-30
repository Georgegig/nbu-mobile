import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public locationsApi: LocationsApiProvider) {
  }

  ionViewDidLoad() {
    debugger;
    let estate = this.navParams.data.estate;
 
    this.map = {
      lat: estate.latitude,
      lng: estate.longitude,
      zoom: 12,
      markerLabel: estate.address
    };
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}
