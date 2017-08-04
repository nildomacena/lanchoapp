import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoCadastroPage } from './endereco-cadastro';

@NgModule({
  declarations: [
    EnderecoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoCadastroPage),
  ],
})
export class EnderecoCadastroPageModule {}
