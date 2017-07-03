import { Platform } from 'ionic-angular';
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
  authState: Observable<firebase.User>;
  user: any;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public facebook:Facebook
    ) {
      this.authState = this.afAuth.authState;
      this.authState.subscribe(user => {
        this.user = firebase.auth().currentUser;
      })
  }

  listarItens(){
    return this.db.list('itens').first().toPromise();
  } 

  listarMesas(){
    return this.db.list('mesas').first().toPromise();
  }
  listarTabs(){
    return this.db.list('tabs').first().toPromise();
  }
  enviaMensagem(email: string, message: string): firebase.Promise<any>{
      return firebase.database().ref('contato').push({email: email, mensagem: message})
  }

  criarUsuarioComEmail(email:string, senha:string, nome:string){
    return firebase.auth().createUserWithEmailAndPassword(email,senha)
              .then(user => {
                console.log(user);
                firebase.auth().currentUser.updateProfile({displayName: nome, photoURL: ''});
                this.db.list('usuarios_sys/').push({uid:user.uid, nome: nome, email: user.email})
              })
  }
  loginComEmail(email:string, senha:string){
    return firebase.auth().signInWithEmailAndPassword(email,senha);
  }
  loginComFacebook(): firebase.Promise<any>{
    if(this.platform.is('mobile') && this.platform.is('cordova')){
      console.log('rodando no smartphone');
      return this.facebook.login(['user_friends', 'public_profile', 'email'])
        .then(userFacebook => {
          let accessToken = userFacebook.authResponse.accessToken;
          let credential: firebase.auth.AuthCredential;
          console.log(userFacebook);
          firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(accessToken))
            .then(user => {
                console.log('User após credencial: ', user);
                return Promise.resolve('logado');
            })
            .catch(err => {
              console.error(err);
            })
        })
    }
    else{
      console.log('rodando no navegador');
      let provider = new firebase.auth.FacebookAuthProvider();
      
      return firebase.auth().signInWithRedirect(provider);

    }
  }

  checaAcessoRestrito():Promise<boolean>{ //Verifica se o usuário tem acesso restrito ao sistema
    return this.db.list('usuarios_sys/',{query :{
      orderByChild: 'uid',
      equalTo: firebase.auth().currentUser.uid
    }}).first().toPromise().then(user_sys => {
      console.log(user_sys);
      if(user_sys.length > 0)
        return Promise.resolve(true);
      else  
        return Promise.resolve(false);
    })
  }
  logout(){
    return firebase.auth().signOut();
  }
}
