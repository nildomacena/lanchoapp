import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  carrinho: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public alertCtrl: AlertController
  ) {
    this.carrinho = fire.carrinho;
  }

  ionViewDidLoad() {
    console.log('Carrinho: ',this.carrinho);
    
  }

  voltar(){
    this.navCtrl.pop();
  }

  addItem(item){
    this.carrinho  = this.fire.incrementaItem(item);

  }

  removeItem(item){
    this.carrinho  = this.fire.decrementaItem(item);
  }

  addObservacao(item){
    console.log(item);
    let buttons:any[];
    if(item.observacao){
      buttons = [
        {
        text: 'Cancelar', role: 'cancel',
        handler: () => {
            console.log('Cancel clicked');
          }  
        },
        {
        text: 'Apagar',
        handler: () => {
            this.fire.apagarObservacao(item);
          }
        }, 
        {
          text: 'Ok',
          handler: data => {
            this.carrinho = this.fire.adicionarObservacao(item,data.observacao)
          }
        }
      ]
    }
    else{
      buttons = [
        {
        text: 'Cancelar', role: 'cancel',
        handler: () => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Ok',
          handler: data => {
            this.carrinho = this.fire.adicionarObservacao(item,data.observacao)
          }
        }
      ]
    }
    let alert = this.alertCtrl.create({
      title: 'Observação',
      message: item.observacao?'Esse item já possui uma observação. Deseja apagar ou substituir?':'Deseja adicionar alguma observação ao item?',
      inputs: [{
        placeholder: 'Ex.: Sem presunto com mais queijo',
        name: 'observacao'
      }],
      buttons: buttons
    });
    alert.present();
  }
}
