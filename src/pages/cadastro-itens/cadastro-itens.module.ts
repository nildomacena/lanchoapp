import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroItensPage } from './cadastro-itens';

@NgModule({
  declarations: [
    CadastroItensPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroItensPage),
  ],
  exports: [
    CadastroItensPage
  ]
})
export class CadastroItensPageModule {}
