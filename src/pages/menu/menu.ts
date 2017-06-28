import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
@IonicPage()
export class MenuPage {

  tab1Root = 'Tab1Page'
  tab2Root = 'Tab2Page'
  tab3Root = 'Tab3Page'


  constructor(public navCtrl: NavController) {}

}
