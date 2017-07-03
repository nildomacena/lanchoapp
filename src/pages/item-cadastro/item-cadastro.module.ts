import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCadastroPage } from './item-cadastro';

@NgModule({
  declarations: [
    ItemCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCadastroPage),
  ],
  exports: [
    ItemCadastroPage
  ]
})
export class ItemCadastroPageModule {}
