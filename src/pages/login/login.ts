import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

import { ToastProvider } from '../../providers/toast/toast';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  user = {} as User;

  constructor(private toast: ToastProvider, private navCtrl: NavController, private afauth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(): Promise<any>{
    try{
      const result = await this.afauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
        this.navCtrl.setRoot('HomePage');
        console.log(result.user.email);
      }
    catch(e){
      console.error(e);
      this.toast.show(e.message);
      console.log(e); 
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}