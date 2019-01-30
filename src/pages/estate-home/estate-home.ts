import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstateDetailPage } from '../pages';
import { MapPage } from '../map/map';
import { SimilarPage } from '../similar/similar';

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})
export class EstateHomePage {
  overviewTab: any;
  mapTab: any;
  similarTab: any;
  estate: any = {};
  locationId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.estate = this.navParams.get('estate');
    this.locationId = this.navParams.get('locationId');
    // TODO: Always land on overview
    this.overviewTab = EstateDetailPage;
    this.mapTab = MapPage;
    this.similarTab = SimilarPage;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
