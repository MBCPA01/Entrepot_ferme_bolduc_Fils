import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  Capteurs: Observable<any[]>;

  Fans: Observable<any[]>;

  Alarm: any;

  menu: string;
  menuTmp: string;


  constructor(private navCtrl: NavController, public navParams: NavParams,private firebaseRequest : FirebaseRequestProvider, private afauth: AngularFireAuth, private toast: ToastProvider) {
    this.Capteurs = firebaseRequest.get('Capteurs');
    this.Fans = firebaseRequest.get('Fans');    
    this.Alarm = firebaseRequest.getObj('Alert');
  }

  async logoutClicked(){
    return this.afauth.auth.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage')
    });;
  }

  descriptionClicked(menuItemSel: string, Index:number): Promise<any>{
    return this.navCtrl.push('DescriptionPage', { 'menuItemSelParam': menuItemSel,'idexParam': Index });
  }

  onClickItemList(description:JSON, index:Number){
    
    if(this.menu === "Capteurs"){
      this.toast.show('Capteur ' + index +' : ' + description);
    }
    if(this.menu === "Fans"){
      this.toast.show('Fans ' + index +' : ' + description);
    }
  }

  alarmClicked(event:any){
    this.toast.show("icone rouge: faute de l'automate");
  }

  ionViewWillLoad() {
    this.afauth.authState.subscribe(data =>{
      if( data && data.email && data.uid ){
          this.toast.show('Bonjour ' + data.email);
      }
      else{
          this.toast.show('une erreur a ete produite');
      }
    })
  }

}