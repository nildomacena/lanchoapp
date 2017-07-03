import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-cadastro',
  templateUrl: 'item-cadastro.html',
})
export class ItemCadastroPage {
  tabs: any[];
  item = { descricao: '', preco: 0, tab: '' };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    public fire: FireProvider
    ) {
  }
  
  ionViewCanEnter(){
    return this.fire.checaAcessoRestrito()  
      .then(result => {
        if(!result)
          this.navCtrl.setRoot('MenuPage')
      })
  }
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    })
    loading.present();
    this.fire.listarTabs()
      .then(tabs => {
        this.tabs = tabs;
        loading.dismiss();
      })
    console.log('ionViewDidLoad ItemCadastroPage');
  }

  salvar(){
    this.item.preco = +this.item.preco
    console.log(this.item);
  }
}
