import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcessoRestritoPage } from './acesso-restrito';

@NgModule({
  declarations: [
    AcessoRestritoPage,
  ],
  imports: [
    IonicPageModule.forChild(AcessoRestritoPage),
  ],
  exports: [
    AcessoRestritoPage
  ]
})
export class AcessoRestritoPageModule {}
