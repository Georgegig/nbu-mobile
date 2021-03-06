import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LocationsPage, EstateHomePage } from '../pages';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {
  favorites = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController, 
    public locationsApi: LocationsApiProvider,
    public userSettings: UserSettingsProvider
    ) {
  }

  ionViewWillEnter() {
    this.userSettings.getAllFavorites().then(favs => {
      this.favorites = favs;
    });
  }

  goToLocations(){
    this.navCtrl.push(LocationsPage);
  }

  favoriteTapped($event, favorite){
    let loader = this.loadingController.create({
        content: 'Getting data...'
    });
    loader.present();
    this.locationsApi.getLocationData(favorite.locationId)
        .subscribe(t => {
            loader.dismiss();
            this.navCtrl.push(EstateHomePage, {estate: favorite.estate, locationId: favorite.locationId});
        });
}

}
