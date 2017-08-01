import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/catch';


@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public util: UtilProvider
    ) {
  }

  ionViewDidLoad() {
    this.alertaInicial();
  }

  alertaInicial(erro?:boolean){
    let alert = this.alertCtrl.create({
      title: 'Entrar com endereço',
      message: 'Deseja inserir sua localização pelo CEP ou manualmente?',
      buttons: [
        {
        text: 'Buscar pelo CEP',
        handler: data => {
            this.buscarPeloCEP(data.cep)
          }
        }, {
          text: 'Digitar manualmente',
          handler: () => {
          console.log('Ok clicked');
        }
        }
      ]
    });
    alert.present();
  }

  buscarPeloCEP(cep:string){
    this.util.buscarPeloCEP(cep)
      .subscribe(
        result => {
          console.log(result);
        }
      )
      

  }
}
