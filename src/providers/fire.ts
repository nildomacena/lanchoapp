import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';


@Injectable()
export class FireProvider {
  user: Observable<firebase.User>;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) {
      this.user = this.afAuth.authState;
  }

  listarItens(){
    return this.db.list('itens').first().toPromise();
  } 
}
