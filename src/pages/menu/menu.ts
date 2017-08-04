import { CallNumber } from '@ionic-native/call-number';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
@IonicPage()
export class MenuPage {
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  titulo: string = 'Sanduíches';
  
  tab1Root = 'Tab1Page'
  tab2Root = 'Tab2Page'
  tab3Root = 'Tab3Page'


  constructor(
    public navCtrl: NavController,
    public callNumber: CallNumber
    ) {
    
  }

  ionViewDidLoad(){
    console.log('entrou no menu');
  }
  
  onTabSelect($event){
    console.log($event);
    if($event.index == 0){
      this.titulo = 'Sanduíches'
    }
    else if($event.index == 1){
      this.titulo = 'Bebidas'
    }
    else if($event.index == 2){
      this.titulo = 'Combos'
    }
  }
  ligar(){
      this.callNumber.callNumber('99987-2147',true);
  }
}
