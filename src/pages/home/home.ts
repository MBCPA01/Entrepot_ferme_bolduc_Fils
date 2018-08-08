import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 
import { ToastProvider } from '../../providers/toast/toast';
import { error } from 'util';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Capteurs: Observable<any[]>;
  CapteurDescription: Observable<any[]>;


  constructor(private navCtrl: NavController, public navParams: NavParams,private firebaseRequest : FirebaseRequestProvider, private afauth: AngularFireAuth, private toast: ToastProvider) {
    this.Capteurs = firebaseRequest.get('Capteurs');
  }

  async logoutClicked(){
    return this.afauth.auth.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage')
    });;
  }

  descriptionClicked(Index:number): Promise<any>{
    return this.navCtrl.push('DescriptionCapteurPage', { 'idexParam': Index });
  }

  onClickCapteur(description:JSON, index:Number){
    this.toast.show('Capteur' + index +' : ' + description);
  }

  ionViewWillLoad() {
    this.afauth.authState.subscribe(data =>{
      if( data && data.email && data.uid ){
          this.toast.show('Bonjour ' + data.email);
      }
      else{
          this.toast.show('error');
      }
    })
  }

}