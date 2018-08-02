import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DescriptionCapteurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description-capteur',
  templateUrl: 'description-capteur.html',
})
export class DescriptionCapteurPage {
  idexFromHome: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let data = navParams.get('idexParam');
  	
  	if(data != null){
  		this.idexFromHome = navParams.get('idexParam');
  	}
  }

  modifyDescriptionClick(capteurDescription:string){
  	console.log(capteurDescription);
  }

  gotoHomePage(){
  	this.navCtrl.push('HomePage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionCapteurPage');
  }

}
