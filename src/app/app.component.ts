import { FireProvider } from './../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';

import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: any;
  logado:boolean = false;
  rootPage: any = 'MenuPage';

  pages: Array<{title: string, component: any, icon?:string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public fire: FireProvider,
    public app: App
    ) {
    this.initializeApp();
    this.fire.authState.subscribe(dados => {
        console.log(dados);
        if(dados){
          this.user = firebase.auth().currentUser;
          console.log(this.user);
          this.logado = true

        }
        else{
          this.logado = false;
          console.log('Não está logado');
        }
      })
    this.pages = [
      { title: 'Nos encontre', component: 'MapaPage', icon:'map' },
      { title: 'Cardápio', component: 'MenuPage', icon:'book' },
      { title: 'Sorteios', component: 'SorteiosPage', icon:'logo-usd' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  goToContato(){
    this.app.getRootNav().push('FaleConoscoPage', {adicional:true});
  }
  openPage(page) {

    this.nav.push(page.component);
  }

  login(){
    this.fire.loginComFacebook();
  }
  sair(){
    this.fire.logout();
  }
}
