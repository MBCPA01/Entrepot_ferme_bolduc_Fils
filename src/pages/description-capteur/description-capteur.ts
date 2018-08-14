import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request'; 

@IonicPage()
@Component({
  selector: 'page-description-capteur',
  templateUrl: 'description-capteur.html',
})
export class DescriptionPage {

  indexFromHome: number = 0;
  menuItemSelFromHome: string = "";
  description:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afReq: FirebaseRequestProvider) {

    this.description = '';

  	let data = navParams.get('idexParam');
  	if(data != null){
      this.indexFromHome = navParams.get('idexParam');
      this.menuItemSelFromHome = navParams.get('menuItemSelParam');
  	}

  }

  modifyDescriptionClick(){
  	this.afReq.set(this.menuItemSelFromHome+'/'+this.indexFromHome+'/description',this.description).then(_ => this.navCtrl.setRoot('HomePage'));
  }

  gotoHomePage(){
  	this.navCtrl.setRoot('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionCapteurPage');
  }

}
