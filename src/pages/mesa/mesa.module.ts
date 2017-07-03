import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesaPage } from './mesa';

@NgModule({
  declarations: [
    MesaPage,
  ],
  imports: [
    IonicPageModule.forChild(MesaPage),
  ],
  exports: [
    MesaPage
  ]
})
export class MesaPageModule {}
