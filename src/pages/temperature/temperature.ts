import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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

  testRadioOpen: boolean;
  selectionSection: string;
  selectionEntrepot: string;

  constructor(public alerCtrl: AlertController, private navCtrl: NavController,private firebaseRequest : FirebaseRequestProvider, private toast: ToastProvider) {
    this.selectionSection = '';
    this.selectionEntrepot = '';
    
  }

  onSelectEntrepotChange(selectionEntrepotChanged: any) {
    this.selectionEntrepot = selectionEntrepotChanged;
    console.log('Selected', selectionEntrepotChanged);
    console.log(this.Capteurs);
    
  }

  onSelectSectionChange(selectionSectionChanged: any) {
    this.selectionSection = selectionSectionChanged;
    console.log('Selected', selectionSectionChanged);
    this.Capteurs = this.firebaseRequest.get('Capteurs'+'/'+this.selectionEntrepot+'/'+this.selectionSection)
    
  }

  descriptionClicked(Index:number): Promise<any>{
    return this.navCtrl.push('DescriptionPage', { 'PrevPage': 'TemperaturePage', 'PageItem': 'Capteurs','idexParam': Index, 'SelectionVille': this.selectionEntrepot, 'SelectionSection': this.selectionSection});
  }

  onClickItemList(description:JSON, index:Number){
      this.toast.show('Capteur ' + index +' : ' + description);
  }
  
  statsClicked(Index:number): Promise<any>{
    return this.navCtrl.push('StatistiquesPage', { 'PrevPage': 'TemperaturePage', 'PageItem': 'Capteurs','idexParam': Index });
  }

}