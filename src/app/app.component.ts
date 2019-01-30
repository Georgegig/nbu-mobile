import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyEstatesPage, LocationsPage, EstateHomePage } from '../pages/pages';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { LocationsApiProvider } from '../providers/locations-api/locations-api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  MyEstatesPage
  rootPage: any = MyEstatesPage;
  favoriteEstates: any[];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public userSettings: UserSettingsProvider,
    public loadingController: LoadingController, 
    public locationsApi: LocationsApiProvider,
    public events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyEstatesPage);
  }

  goToLocations() {
    this.nav.push(LocationsPage);
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteEstates = favs);
  }

  goToEstate(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.locationsApi.getLocationData(favorite.locationId).subscribe(l => this.nav.push(EstateHomePage, {estate: favorite.estate, locationId: favorite.locationId}));
  }
}
