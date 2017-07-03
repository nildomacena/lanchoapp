import { UtilProvider } from './../../providers/util';
import { HomePage } from './../home/home';
import { FireProvider } from './../../providers/fire';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mesa',
  templateUrl: 'mesa.html',
})
export class MesaPage {
  mesa: any;
  itens: any[] = [];
  total: number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public util: UtilProvider,
    public zone: NgZone
    ) {
    this.mesa = this.navParams.get('mesa');
    if(!this.mesa){
      this.navCtrl.setRoot('MesasPage');
    }
    
    else{
      this.getMesa();
      if(this.mesa.comanda_aberta){
        // Import the AlertController from ionic package 
        // Consume it in the constructor as 'alertCtrl' 
        let alert = this.alertCtrl.create({
          title: 'Mesa com comanda aberta',
          message: 'Esta mesa tem uma comanda aberta. Deseja continuar o atendimento ou limpar a comanda?',
          buttons: [
            {
            text: 'Continuar atendimento', role: 'cancel',
            handler: () => {
             
            }
            }, {
              text: 'Limpar comanda',
              handler: () => {
              this.limpar();
              //this.getMesa();
            }
            }
          ]
        });
        alert.present();
      }
      
      }
  }

  getMesa(){
     this.fire.getMesa(this.mesa.$key)
        .subscribe(mesa => {
          this.mesa = mesa;
          console.log(this.mesa);
          if(this.mesa.comanda_aberta)
            this.updateComanda();
        })
  }
  updateComanda(){
    console.log('updatecomanda()')
    this.itens = [];
    this.total = 0;
    if(this.mesa.comanda_aberta){
      this.zone.run(() => {
        Object.keys(this.mesa.comanda_aberta.itens).map((key,index) => {
          this.itens.push(this.mesa.comanda_aberta.itens[key]);
          this.itens[index]['key'] = key;
          this.total += this.mesa.comanda_aberta.itens[key].preco;
        })
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MesaPage');
  }

  limpar(){
    let alert = this.alertCtrl.create({
      title: 'Limpar comanda',
      message: 'Deseja realmente limpar a comanda?',
      buttons: [
        {
        text: 'Cancel', role: 'cancel',
        handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.fire.limparComanda(this.mesa.$key)
              .then(_ => {
                this.itens = [];
                this.total = 0;
                let toast = this.toastCtrl.create({
                  message: 'Comanda limpa',
                  duration: 2500,
                  showCloseButton: true,
                  closeButtonText: 'x'
                });
                toast.present();
              })
          }
        }
      ]
    });
    alert.present();
  }
  
  abrirActionSheet(){
    let action = this.actionSheetCtrl.create({
      title: 'Carrinho',
      buttons: [
        {
         text: 'Limpar carrinho',
         role: 'destructive',
         icon: 'trash',
         handler: () => {
           this.limpar()
         }
        },
        {
         text: 'Imprimir comanda',
         role: 'destructive',
         icon: 'print',
         handler: () => {
           this.imprimir()
         }
        }
      ]
    })
    action.present();
  
  }

  
  imprimir(){
    if(!this.mesa.comanda_aberta){
      this.util.alertaSimples('Comanda vazia', 'Adicione itens para poder imprimir a comanda');
    }
    else{
      this.fire.imprimirComanda()
      let toast = this.toastCtrl.create({
        message: 'Impresso',
        duration: 2500,
        showCloseButton: true,
        closeButtonText: 'x'
      });
      toast.present();
      this.navCtrl.pop();
    }
  }

  deleteItem(item, hold:boolean){
    if(hold){
      let alert = this.alertCtrl.create({
        title: 'Excluir item',
        message: 'Deseja excluir o item' +item.descricao+'?',
        buttons: [
          {
          text: 'Cancel', role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
          }, {
            text: 'Ok',
            handler: () => {
              this.zone.run(() => {
                this.fire.deletarItemComanda(this.mesa.$key, item.key)
                  .then(_ => {
                    this.getMesa();
                    this.updateComanda();
                    console.log('Item excluído')
                  })
                  .catch(err => {
                    console.error(err);
                  })
              })
            }
          }
        ]
      });
      alert.present();
    }
    else{
      this.zone.run(() => {
        this.fire.deletarItemComanda(this.mesa.$key, item.key)
          .then(_ => {
            console.log('Item excluído')
            this.updateComanda();
          })
          .catch(err => {
            console.error(err);
          })
      })
    }
  }

  adicionarItem(){
    let modal = this.modalCtrl.create('ItemPage',{adicionar: true});
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      if(data){
        this.zone.run(() => {
          this.fire.adicionarItemComanda(this.mesa.$key,data.item)
            .then(snap => {
              console.log('após adicionar item a comanda',snap);

            })
        })
      }
    })
  }

  fecharComanda(){ 
    let alert = this.alertCtrl.create({
      title: 'Fechar comanda',
      message: 'Tem certeza que deseja fechar a comanda?<br>Valor total: '+this.total+'?',
      buttons: [
        {
        text: 'Cancel', role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
        }, {
          text: 'Ok',
          handler: () => {
            this.fire.fecharComanda(this.mesa,this.total)
              .then(_ => {
                let toast = this.toastCtrl.create({
                  message: 'Pedido enviado para a cozinha',
                  duration: 2500,
                  showCloseButton: true,
                  closeButtonText: 'x'
                });
                toast.present();
                this.navCtrl.setRoot('MesasPage');
              })
          }
        }
      ]
    });
    alert.present();
    
  }
}
