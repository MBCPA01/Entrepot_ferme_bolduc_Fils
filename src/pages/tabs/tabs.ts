import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1root: string;
  tab2root: string;
  tab3root: string;

  constructor(private navCtrl: NavController, private afauth: AngularFireAuth) {
    this.tab1root = 'TemperaturePage';
    this.tab2root = 'FansPage';
    this.tab3root = 'AlertPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  async logoutClicked(){
    return this.afauth.auth.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage')
    });;
  }

}
