import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyEstatesPage, LocationsPage, EstateDetailPage, EstatesPage, EstateHomePage, MapPage } from '../pages/pages';
import { LocationsApiProvider } from '../providers/locations-api/locations-api';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { SimilarPage } from '../pages/similar/similar';

@NgModule({
  declarations: [
    MyApp,
    MyEstatesPage,
    LocationsPage,
    EstateDetailPage,
    EstatesPage,
    EstateHomePage,
    MapPage,
    SimilarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAi91xerL_8t_7tnCR7GstQ2W0uxUT6ILk'
    })  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyEstatesPage,
    LocationsPage,
    EstateDetailPage,
    EstatesPage,
    EstateHomePage,
    MapPage,
    SimilarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationsApiProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}
