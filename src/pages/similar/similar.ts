import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsApiProvider } from '../../providers/locations-api/locations-api';
import _ from 'lodash';
import { EstateHomePage } from '../pages';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html'
})
export class SimilarPage {
  estate: any;
  locationId: any;
  locationName: any;
  similarFilter: string = 'region';
  estates: any[];
  filterByType: string = 'Apartment';
  filterToggle: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public locationsApi: LocationsApiProvider) {
      this.estate = this.navParams.data.estate;
      this.locationId = this.navParams.data.locationId;
  }

  ionViewWillEnter() {
    const loc =  this.locationsApi.getCurrentLocation();
    this.locationName = loc.location.name;
    this.filterSimilar(this.filterToggle, this.filterByType);
  }

  async filterSimilar(filterToggled, filterByType) {
      let allEstates = _.cloneDeep(this.locationsApi.getCurrentLocation().estates);
      if (filterToggled && filterByType) {
        allEstates = _.filter(allEstates, ae => ae.type === filterByType);
      }
      if(this.similarFilter === 'all'){
        this.estates = _.chain(allEstates)
        .groupBy('region')
        .toPairs()
        .map(item => _.zipObject(['regionName', 'regionEstates'], item))
        .value();
      } else {
        const filteredItems = 
        this.estates = _.chain(_.filter(allEstates, ae => ae.region === this.estate.region))
        .groupBy('region')
        .toPairs()
        .map(item => _.zipObject(['regionName', 'regionEstates'], item))
        .value();
      }
  }

  getHeader(record, recordIndex, records){
    return record.regionName;  
  }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate, locationId: this.locationId});
  }

  changeInFilter($event) {
    this.filterSimilar(this.filterToggle, $event);
  }

  changeInFilterToggle($event) {
    this.filterSimilar($event, this.filterByType);
  }
}
