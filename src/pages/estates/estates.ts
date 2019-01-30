import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstateHomePage } from '../pages';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {
  estates = [];
  private allEstatesGroupedByRegion: any;
  private selectedLocation: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public locationsApi: LocationsApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    this.selectedLocation = this.navParams.data;
 
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      this.locationsApi.getLocationData(this.selectedLocation.id).subscribe(data => {
        // subdivide the estates into divisions
        this.allEstatesGroupedByRegion =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['regionName', 'regionEstates'], item))
          .value();
          this.estates = this.allEstatesGroupedByRegion;  
          loader.dismiss();  
      });
    });
  }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate, locationId: this.selectedLocation.id});
  }
}
