import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public photoViewer: PhotoViewer
  ) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  abrirImagem(){
    this.photoViewer.show(this.item.imagem);
  }

}
