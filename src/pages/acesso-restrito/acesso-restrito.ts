import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-acesso-restrito',
  templateUrl: 'acesso-restrito.html',
})
export class AcessoRestritoPage {
  loading: Loading;
  criar_usuario: boolean = false;
  registerCredentials = { email: '', senha: '' };
  confirma_senha: string = '';
  nome: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fire: FireProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcessoRestritoPage');
  }

  login(){
    if(this.criar_usuario){
      console.log(this.registerCredentials.senha, this.confirma_senha)
      if(this.registerCredentials.senha != this.confirma_senha){
        let alert = this.alertCtrl.create({
          title: 'Erro',
          message: 'A senhas digitadas não conferem. Tente novamente.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.confirma_senha = '';
                this.registerCredentials.senha = ''
              }
            }
          ]
        });
        alert.present();
      }
      else{
        this.fire.criarUsuarioComEmail(this.registerCredentials.email,this.registerCredentials.senha, this.nome)
          .then(retorno => {
            console.log(retorno);
            this.navCtrl.setRoot('MesasPage');
          })
          .catch(err => {
            console.error(err);
            let alert = this.alertCtrl.create({
              title: 'Erro',
              message: 'Ocorreu um erro durante a criação do usuário. Verifique as informações digitadas e tente novamente mais tarde. Caso o erro persista, entre em contato com o admnistrador do sistema. ',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    console.log('Ok clicked');
                  }
                }
              ]
            });
            alert.present();
          })
      }
    }
    else{
      let loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      })
      this.fire.loginComEmail(this.registerCredentials.email,this.registerCredentials.senha)
        .then(_ => {
        this.navCtrl.setRoot('MesasPage')
      })
      .catch(err => {
        let mensagem: string;
        if(err['code'] == 'auth/wrong-password'){
          mensagem = 'Usuário ou senha estão incorretos. Verifique as informações digitadas.'
        }
        else if(err['code'] == 'auth/invalid-email'){
          mensagem = 'Digite um email válido.';
        }
        else if(err['code'] == 'auth/user-not-found'){
          mensagem = 'Usuário não encontrado.';
        }
        else{
          mensagem = 'Ocorreu algum erro durante o login. Tente novamente mais tarde.'
        }
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: mensagem,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        })
        alert.present();
        alert.onWillDismiss(() => {
          loading.dismiss()
        });
        console.error(err);
      })
    }
    console.log(this.registerCredentials);
  }

  createAccount(){
    this.criar_usuario = !this.criar_usuario;
  }


}
