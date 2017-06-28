import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public callNumber: CallNumber,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
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
