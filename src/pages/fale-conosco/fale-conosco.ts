import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fale-conosco',
  templateUrl: 'fale-conosco.html',
})
export class FaleConoscoPage {

  email: string;
  mensagem: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public fire: FireProvider) {
      this.email = '';
      this.mensagem = '';
    }

  ionViewDidLoad() {
    console.log(this.email.length)
    console.log('ionViewDidLoad ContatoPage');
  }

  enviar(){
    this.fire.enviaMensagem(this.email, this.mensagem)
      .then(_ => {
        let toast = this.toastCtrl.create({
          message: 'Agradecemos o contato. Em breve retornaremos a mensagem.',
          duration: 2500,
          showCloseButton: true,
          closeButtonText: 'X'
        })
        this.navCtrl.pop();
        toast.present();
      });
  }
  backButtonAction(){
    this.navCtrl.setRoot('HomePage');
  }
}