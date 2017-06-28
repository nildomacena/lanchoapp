import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosRealizadosPage } from './sorteios-realizados';

@NgModule({
  declarations: [
    SorteiosRealizadosPage,
  ],
  imports: [
    IonicPageModule.forChild(SorteiosRealizadosPage),
  ],
  exports: [
    SorteiosRealizadosPage
  ]
})
export class SorteiosRealizadosPageModule {}
