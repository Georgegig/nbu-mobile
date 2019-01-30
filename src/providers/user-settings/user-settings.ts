import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettingsProvider {

  constructor(public storage: Storage, public events: Events) {
  }

  favorEstate(locationId, locationName, estate) {
    let item = { locationId: locationId, locationName: locationName, estate: estate };
    this.storage.set(estate.id.toString(), JSON.stringify(item)).then(() => {
      this.events.publish('favorites:changed');
    });
  }

  unfavorEstate(estateId) {
    this.storage.remove(estateId.toString());
    this.events.publish('favorites:changed');
  }

  isFavoriteEstate(estateId) : Promise<boolean> {
    return this.storage.get(estateId.toString()).then(value => value ? true : false);
  }

  async getAllFavorites() : Promise<any> {
    return new Promise(async resolve => {
        let results = [];
        await this.storage.forEach(data => {
            results.push(JSON.parse(data));
        });
        return resolve(results);
    });
  }
}
