import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public callNumber: CallNumber,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
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
              .then(_ => console.log('ligou'))
              .catch(err => console.error(err))
          }
        }
      ]
    });
    alert.present();
  }
}
