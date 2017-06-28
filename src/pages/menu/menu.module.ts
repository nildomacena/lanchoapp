import { Tab3Page } from './../tab3/tab3';
import { Tab2Page } from './../tab2/tab2';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { Tab1Page } from '../tab1/tab1';

@NgModule({
  declarations: [
    MenuPage
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ]
})
export class MenuPageModule {}
