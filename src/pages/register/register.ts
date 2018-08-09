import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastProvider } from '../../providers/toast/toast';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private toast: ToastProvider, private navCtrl: NavController, private navParams: NavParams, private afauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.navCtrl.push('ProfilePage');
    }
    catch (e){
      console.error(e);
      this.toast.show(e.message);
    }
  }

}