import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosPendentesPage } from './sorteios-pendentes';

@NgModule({
  declarations: [
    SorteiosPendentesPage,
  ],
  imports: [
    IonicPageModule.forChild(SorteiosPendentesPage),
  ],
  exports: [
    SorteiosPendentesPage
  ]
})
export class SorteiosPendentesPageModule {}
