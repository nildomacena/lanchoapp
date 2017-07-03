import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesasPage } from './mesas';

@NgModule({
  declarations: [
    MesasPage,
  ],
  imports: [
    IonicPageModule.forChild(MesasPage),
  ],
  exports: [
    MesasPage
  ]
})
export class MesasPageModule {}
