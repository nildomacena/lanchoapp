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
  public carrinho: any;
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
      this.carrinho = {
        valor_total: 0,
        quantidade_total: 0,
        itens:[]
      }
  }

  listarItens(){
    return this.db.list('itens').first().toPromise();
  }

  listarCategorias(){
    return this.db.list('categorias').first().toPromise();
  }

  listarMesas(){
    return this.db.list('mesas').first().toPromise();
  }
  
  getMesa(mesa_key:string){
    return this.db.object(`mesas/${mesa_key}`);
  }

  listarTabs(){
    return this.db.list('tabs').first().toPromise();
  }
  enviaMensagem(email: string, message: string): firebase.Promise<any>{
      return firebase.database().ref('contato').push({email: email, mensagem: message})
  }

                        /*** CARRINHO ***/

adicionarItemCarrinho(novoItem, observacao?){
  let inserido: boolean = false;
  
  if(this.carrinho.itens.length == 0){
    this.carrinho.itens.push(novoItem);
    this.carrinho.itens[0]['quantidade'] = 1;

    inserido = true;
    this.atualizarValorTotalCarrinho();
  }
  else{
    this.carrinho.itens.map((item, index) => {
      if(item.$key == novoItem.$key){
        item.quantidade++;
        this.atualizarValorTotalCarrinho()
        inserido = true;
      }
    })
    if(!inserido){
      let index = this.carrinho.itens.push(novoItem) - 1;
      this.carrinho.itens[index]['quantidade'] = 1;
      this.atualizarValorTotalCarrinho();
      inserido = true;
    }
  }

  console.log(this.carrinho);
}

incrementaItem(novoItem):any{
  this.carrinho.itens.map((item,index) => {
    if(item.$key == novoItem.$key){
        this.carrinho.itens[index].quantidade ++;
    }
  })
  this.atualizarValorTotalCarrinho();
  console.log(this.carrinho);
  return this.carrinho;
}

decrementaItem(novoItem):any{
  //let a: any[];
  //a.splice()
  this.carrinho.itens.map((item,index) => {
    if(item.$key == novoItem.$key){
      if(item.quantidade <= 1)
        this.carrinho.itens.splice(index,1)
      else{
        this.carrinho.itens[index].quantidade --;
      }
    }
  })
  this.atualizarValorTotalCarrinho();
  console.log(this.carrinho);
  return this.carrinho;
}

adicionarObservacao(novoItem, observacao){
  this.carrinho.itens.map((item,index) => {
    if(item.$key == novoItem.$key){
        this.carrinho.itens[index]['observacao']=observacao;
    }
  })
  return this.carrinho;
}

apagarObservacao(novoItem){
  this.carrinho.itens.map((item,index) => {
    if(item.$key == novoItem.$key){
        delete this.carrinho.itens[index]['observacao'];
    }
  })
  return this.carrinho;
}

atualizarValorTotalCarrinho(){
  this.carrinho.valor_total = 0;
  this.carrinho.quantidade_total = 0;
  this.carrinho.itens.map(item => { 
    this.carrinho.valor_total += item.preco * item.quantidade;
    this.carrinho.quantidade_total += item.quantidade;
  })
  console.log(this.carrinho.valor_total)
}



                        /*** ITENS ***/

editarItem(item_key: string, descricao:string, preco:number, categoria:any){
    return this.db.list('itens/').update(item_key, {
      descricao: descricao,
      preco: preco,
      categoria_key: categoria.$key,
      categoria_descricao: categoria.descricao
    })      
  }

  deletarItem(item_key){
    return this.db.list('itens').remove(item_key);
  }

  salvarItem(descricao:string, preco:number, categoria:any){
    return this.db.list('itens').push({descricao: descricao, preco:preco, categoria_descricao: categoria.descricao, categoria_key: categoria.$key})
  }
                        /*** COMANDA  ***/


  limparComanda(mesa_key){
    return this.db.object(`mesas/${mesa_key}/comanda_aberta`).remove();
  }                    

  verificarComandaAberta(mesa_key): firebase.Promise<any>{
    let itens: any[];
    return this.db.object(`mesas/${mesa_key}/comanda_aberta/itens`)
      .first().toPromise().then(itensBD => {
        itens = itensBD;
        itens.map(item => {
          item['impresso'] = true;
        })
      })
  }


  fecharComanda(mesa:any, valor_total:number){
    let timestamp = new Date().getTime();
    Object.keys(mesa.comanda_aberta.itens).map(key => {
      delete mesa.comanda_aberta.itens[key].key
    })
    
    let obj = {
      mesa_descricao: mesa.descricao,
      mesa_key: mesa.$key,
      itens: mesa.comanda_aberta.itens,
      timestamp: timestamp,
      valor_total: valor_total,
      atendido_por: this.afAuth.auth.currentUser.displayName? this.afAuth.auth.currentUser.displayName: this.afAuth.auth.currentUser.email
    }
    console.log(obj);
    return this.db.list('pedidos/').push(obj)
              .then(_ => {
                return this.db.object(`mesas/${mesa.$key}/comanda_aberta`).remove()
              })
  }

  imprimirComanda(){

  }

  adicionarItemComanda(mesa_key:string, item: any){
    return this.db.list(`mesas/${mesa_key}/comanda_aberta/itens`).push(item);
  }

  deletarItemComanda(mesa_key, item_key){
    return this.db.object(`mesas/${mesa_key}/comanda_aberta/itens/${item_key}`).remove();
  }

                        /*** AUTENTICAÇÃO ***/
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
    console.log('login com facebook');
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
      
      return firebase.auth().signInWithRedirect(provider)
        .then(user => {
          console.log('user');
          return Promise.resolve('logado');
        })

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

  checaInfoUsuario(user){
    this.db.list('usuarios_app/',{
      query:{
        orderByChild: 'uid',
        equalTo: user.uid
      }
    })
      .first().toPromise().then(snap => {
        if(snap.length <= 0 ){
          this.db.list('usuarios_app/').push({
            uid: user.uid,
            nome: user.displayName,
            imagem: user.photoURL
          })
          console.log('Novo usuário detectado');
        }
          
        else{
          console.log('usuario já cadastrado')
        }
      })
  }

  getEnderecosUsuario(): Promise<any>{
    return this.db.list(`usuarios_app/`,{
        query:{
          orderByChild: 'uid',
          equalTo: this.user.uid
        }
      })
      .first().toPromise()
  }

  logout(){
    return firebase.auth().signOut();
  }

  getEnderecoUsuario(){

  }
}
