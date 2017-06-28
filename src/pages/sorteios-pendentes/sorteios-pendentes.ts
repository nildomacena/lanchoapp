import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sorteios-pendentes',
  templateUrl: 'sorteios-pendentes.html',
})
export class SorteiosPendentesPage {
  imagem = "http://painel.perdigao.com.br/panel/sites/default/files/styles/is_product_cover_mob_750_823/public/recipes-images/duplo-x-burger.png?itok=RnHhGv5Y"
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
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
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    })
    loading.present();
    this.share.share('Tô participando de um sorteio de um Combo X-Burger na lanchonete tal','Tô participando de um sorteio de um Combo X-Burger na lanchonete tal',this.imagem,'meubiu.com.br')
      .then(_ => {
        loading.dismiss();
      })
  }
}