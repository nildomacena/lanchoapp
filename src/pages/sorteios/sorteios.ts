import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SorteiosPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-sorteios',
  templateUrl: 'sorteios.html'
})
@IonicPage()
export class SorteiosPage {

  sorteiosPendentesRoot = 'SorteiosPendentesPage'
  sorteiosRealizadosRoot = 'SorteiosRealizadosPage'


  constructor(public navCtrl: NavController) {}

}
