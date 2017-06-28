import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
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
