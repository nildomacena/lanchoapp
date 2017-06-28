import { Facebook } from '@ionic-native/facebook';
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
    public afAuth: AngularFireAuth,
    public facebook:Facebook
    ) {
      this.user = this.afAuth.authState;
      this.user.subscribe(user => {
        console.log(user);
      })
  }

  listarItens(){
    return this.db.list('itens').first().toPromise();
  } 

  enviaMensagem(email: string, message: string): firebase.Promise<any>{
      return firebase.database().ref('contato').push({email: email, mensagem: message})
  }

  loginComFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    console.log('login com facebook') 
    provider.addScope('public_profile');
    provider.addScope('user_friends');
    provider.addScope('email');
    firebase.auth().signInWithCredential(provider)
    
  }
}
