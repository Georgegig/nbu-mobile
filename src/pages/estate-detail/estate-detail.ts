import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-estate-detail',
  templateUrl: 'estate-detail.html',
})
export class EstateDetailPage {
  estate: any = {};
  games: any[];
  private locationData: any;
  isFavourite = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public locationsApi: LocationsApiProvider,
    public alertController: AlertController,
    public toastController: ToastController,
    public userSettings: UserSettingsProvider) {
      this.estate = this.navParams.get('estate');
  }

  ionViewWillEnter() {
    this.locationData = this.locationsApi.getCurrentLocation();
    this.userSettings.isFavoriteEstate(this.estate.id).then(value => this.isFavourite = value);
  }

  toggleFavourite() {
    if(this.isFavourite) {
      let confirm = this.alertController.create({
        title: "Unfavor?",
        message: "Are you sure you want to remove from saved estates?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFavourite = false;
              this.userSettings.unfavorEstate(this.estate.id);
              let toast = this.toastController.create({
                message: "You have unfavored this estate!",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isFavourite = true;
      this.userSettings.favorEstate(
        this.locationData.location.id,
        this.locationData.location.name,
        this.estate
      );
    }
  }

  refreshAll(refresher){
    this.locationsApi.refreshCurrentLocation().subscribe(() => {
      refresher.complete();
      this.ionViewWillEnter();
    });
  }
}
