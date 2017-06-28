import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  itens: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public callNumber: CallNumber,
    public photoViewer: PhotoViewer,
    public fire: FireProvider
    ) {
      this.itens = [
        {descricao: "X-Burger", imagem: "http://painel.perdigao.com.br/panel/sites/default/files/styles/is_product_cover_mob_750_823/public/recipes-images/duplo-x-burger.png?itok=RnHhGv5Y", detalhes: "Pão, hambúrguer, queijo, presunto e salada", preco: 10},
        {descricao: "X-Alcatra", imagem: "http://www.arenaparque.com/loja/image/cache/data/download-600x600.jpg", detalhes: "Pão, Alcatra, queijo, presunto e salada", preco: 14},
        {descricao: "X-Frango", imagem: "http://sandubadocareca.podepedir.com.br/uploads/podepedir-sanduba-de-frango-desfiado-19-577ef78839362.png", detalhes: "Pão, frango desfiado, queijo, presunto e salada", preco: 13},
        {descricao: "X-Picanha", imagem: "http://sandubadocareca.podepedir.com.br/uploads/podepedir-sanduba-de-picanha-argentina-55-577faea519b38.png", detalhes: "Pão, picanha, queijo, presunto e salada", preco: 17},
        {descricao: "Passaporte de carne", imagem: "http://blog.tnh1.com.br/nidelins/wp-content/uploads/2015/07/blog-passaporte-gaucho21.jpg", detalhes: "Pão seda, carne moída, salsicha e verdura", preco: 10},
        {descricao: "Passaporte de frango", imagem: "http://blog.tnh1.com.br/nidelins/wp-content/uploads/2015/07/blog-passaporte-gaucho1.jpg", detalhes: "Pão seda, frango desfiado, salsicha e verdura", preco: 11},
      ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
  }

  abrirImagem(item){
    console.log(item);
    this.photoViewer.show(item.imagem);
  }

  openDetail(item){
    this.navCtrl.push('ItemDetailPage',{item:item});
  }

  ligar(){
    let alert = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja ligar para nosso estabelecimento?',
      buttons: [
        {
        text: 'Cancelar', role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
        }, {
          text: 'Ok',
          handler: () => {
            this.callNumber.callNumber('33247510',false)
          }
        }
      ]
    });
    alert.present();
  } 
}
