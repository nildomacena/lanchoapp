import { PhotoViewer } from '@ionic-native/photo-viewer';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SuperTabsController } from 'ionic2-super-tabs';

import { GoogleMaps } from '@ionic-native/google-maps';
import { CallNumber } from '@ionic-native/call-number';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook } from '@ionic-native/facebook';

import { FireProvider } from '../providers/fire';
import { UtilProvider } from '../providers/util';


const config = {
    apiKey: "AIzaSyCzjsFXzcq8-X7ut-0Nnd_zYB74EQGVAP8",
    authDomain: "lanchonete-51dd3.firebaseapp.com",
    databaseURL: "https://lanchonete-51dd3.firebaseio.com",
    projectId: "lanchonete-51dd3",
    storageBucket: "lanchonete-51dd3.appspot.com",
    messagingSenderId: "1044105592998"
  };
@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    //SuperTabsModule.forRoot(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    CallNumber,
    PhotoViewer,
    Facebook,
    SocialSharing,
    SuperTabsController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireProvider,
    UtilProvider
  ]
})
export class AppModule {}
