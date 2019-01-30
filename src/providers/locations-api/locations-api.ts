import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class LocationsApiProvider {
  private baseUrl = 'https://royal-estates-app-7c502.firebaseio.com';
  currentLocation: any = {};
  private locationData = {};

  constructor(public http: HttpClient) {
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations.json`)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getLocationData(locationId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.locationData[locationId]) {
        this.currentLocation = this.locationData[locationId];
        return Observable.of(this.currentLocation);
    }

    return this.http.get(`${this.baseUrl}/locations-data/${locationId}.json`)
        .map(response => {
            this.locationData[locationId] = response;
            this.currentLocation = this.locationData[locationId];
            return this.currentLocation;
        });
  }

  refreshCurrentLocation() : Observable<any>{
    return this.getLocationData(this.currentLocation.location.id, true);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }

  getCurrentLocation(){
    return this.currentLocation;
  }
}
