import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 

@IonicPage()
@Component({
  selector: 'page-description-capteur',
  templateUrl: 'description-capteur.html',
})
export class DescriptionCapteurPage {

  indexFromHome: number = 0;
  description:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afReq: FirebaseRequestProvider) {

    this.description = '';

  	let data = navParams.get('idexParam');
  	if(data != null){
  		this.indexFromHome = navParams.get('idexParam');
  	}

  }

  modifyDescriptionClick(){
  	this.afReq.set('Capteurs/'+this.indexFromHome+'/description',this.description).then(_ => this.navCtrl.push('HomePage'));
  }

  gotoHomePage(){
  	this.navCtrl.push('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionCapteurPage');
  }

}
