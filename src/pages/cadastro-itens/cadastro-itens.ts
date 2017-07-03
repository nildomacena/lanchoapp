import { UtilProvider } from './../../providers/util';
import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro-itens',
  templateUrl: 'cadastro-itens.html',
})
export class CadastroItensPage {
  categorias: any;
  preco: string;
  descricao: string = '';
  categoriaSelecionada: any;
  atualizarCategoria: boolean = false;
  item: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public util: UtilProvider,
    public fire: FireProvider,
    public alertCtrl: AlertController
    ) {
      this.categorias = this.navParams.get('categorias');
      this.item = this.navParams.get('item');
      if(this.item){
        this.descricao = this.item.descricao;
        this.preco = this.item.preco;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroItensPage');
  }

  amountChange(){
    this.preco = this.util.detectAmount(this.preco)
  }

  editarCategoria(){
    this.atualizarCategoria = true;
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  apagar(){
    let alert = this.alertCtrl.create({
      title: 'Excluir Item',
      subTitle: 'Deseja realmente excluir o item '+ this.item.descricao + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        { 
          text: 'Ok',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Salvando...'
            })
            this.fire.deletarItem(this.item.$key)
              .then(_ => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                  duration: 2500,
                  closeButtonText: 'X',
                  showCloseButton: true,
                  message: 'Item excluído'
                });
                toast.present();
                this.dismiss();
              })
          }
        }
      ]
    })
    alert.present();
  }


  salvar(){
    if(this.item){
      let loading = this.loadingCtrl.create({
        content: 'Salvando...'
      })
      this.fire.editarItem(this.item.$key, this.descricao,+this.preco, this.categoriaSelecionada? this.categoriaSelecionada: {$key: this.item.categoria_key, descricao: this.item.categoria_descricao})
        .then(_ => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 2500,
            closeButtonText: 'X',
            showCloseButton: true,
            message: 'Item salvo'
          });
          toast.present();
          this.dismiss();
        })
    }

    if(!this.item){
      let loading = this.loadingCtrl.create({
        content: 'Salvando...'
      })
      this.fire.salvarItem(this.descricao,+this.preco,this.categoriaSelecionada)
        .then(_ => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 2500,
            closeButtonText: 'X',
            showCloseButton: true,
            message: 'Item salvo'
          });
          toast.present();
          this.dismiss();
        })
    }
  }
}
