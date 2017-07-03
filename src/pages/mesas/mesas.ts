import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mesas',
  templateUrl: 'mesas.html',
})
export class MesasPage {
  mesas: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider
    ) {
      this.fire.listarMesas()
        .then(mesas => {
          this.mesas = mesas;
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesasPage');
  }

  ionViewCanEnter(){
    return this.fire.checaAcessoRestrito()  
      .then(result => {
        if(!result)
          this.navCtrl.setRoot('MenuPage')
      })
  }

  cadastrar(){

  }

  goToMesa(mesa: any){
    console.log(mesa);
  }
}
