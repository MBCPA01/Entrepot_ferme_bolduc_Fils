import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Profile } from "../../models/profile";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, private afauth: AngularFireAuth, private afdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  createProfile(){
    this.afauth.authState.subscribe(auth =>{
      this.afdb.object('profile/' + auth.uid).set(this.profile).then(()=>this.navCtrl.setRoot('HomePage'))
    })
  }
}