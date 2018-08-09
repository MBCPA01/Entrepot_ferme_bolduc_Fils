import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() loginStatus: EventEmitter<any>;

  constructor(private toast: ToastProvider, private navCtrl: NavController, private navParams: NavParams, private afauth: AngularFireAuth) {
    this.loginStatus = new EventEmitter<any>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(): Promise<any>{
    try{
      const result = await this.afauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
        this.toast.show("Succes");
        this.loginStatus.emit(result);
        console.log(result);
      }
    catch(e){
      console.error(e);
      this.toast.show(e.message);
      this.loginStatus.emit(e);
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}