import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html',
})
export class TemperaturePage {

  Capteurs: Observable<any[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,private firebaseRequest : FirebaseRequestProvider, private toast: ToastProvider) {
    this.Capteurs = firebaseRequest.get('Capteurs');
  }

  descriptionClicked(Index:number): Promise<any>{
    return this.navCtrl.push('DescriptionPage', { 'PrevPage': 'TemperaturePage', 'PageItem': 'Capteurs','idexParam': Index });
  }

  onClickItemList(description:JSON, index:Number){
      this.toast.show('Capteur ' + index +' : ' + description);
  }
}