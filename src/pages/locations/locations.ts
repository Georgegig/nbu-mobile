import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstatesPage } from '../pages';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locations: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public locationsApi: LocationsApiProvider, 
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting locations...',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.locationsApi.getLocations().subscribe(
        locations => {
          this.locations = locations;
          loader.dismiss();
      });
    });
  }

  itemTapped($event, item) {
    this.navCtrl.push(EstatesPage, item);
  }
}
