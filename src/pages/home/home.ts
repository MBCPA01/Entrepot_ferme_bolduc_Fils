import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Capteurs: Observable<any[]>;
  CapteurDescription: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseRequest : FirebaseRequestProvider, private afauth: AngularFireAuth, private toast: ToastController) {
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
    this.toast.create({
            message: 'Voici le lieu du capteur ' + index + ' : ' + description ,
            duration: 3000
          }).present();
  }

  ionViewDidLoad() {
    this.afauth.authState.subscribe(data =>{
      if( data && data.email && data.uid ){
          this.toast.create({
            message: 'Bonjour ' + data.email ,
            duration: 3000
          }).present();

      }
      else{
          this.toast.create({
            message: 'error:',
            duration: 3000
          }).present();
      }
    })
  }

}