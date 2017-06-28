import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sorteios-realizados',
  templateUrl: 'sorteios-realizados.html',
})
export class SorteiosRealizadosPage {
  imagem = "http://painel.perdigao.com.br/panel/sites/default/files/styles/is_product_cover_mob_750_823/public/recipes-images/duplo-x-burger.png?itok=RnHhGv5Y"
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public share: SocialSharing
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteiosRealizadosPage');
  }

  abrirImagem(){
    this.photoViewer.show(this.imagem);
  }

  compartilhar(){
    this.share.share('Tô participando de um sorteio de um Combo X-Burger na lanchonete tal','Tô participando de um sorteio de um Combo X-Burger na lanchonete tal',this.imagem,'meubiu.com.br')
  }
}
