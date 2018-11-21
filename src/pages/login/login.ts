import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private auth: AuthProvider
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signInWithEmail() {
    const loading = this.loadingCtrl.create({
      content: "S'il vous plaît, attendez ..."
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
    .then(() => {
      loading.dismiss();
      this.navCtrl.setRoot('TabsPage');
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = "S'il vous plaît entrer une adresse email valide.";
          break;
        case 'auth/wrong-password':
          this.errorMessage = "Combinaison nom d'utilisateur / mot de passe incorrecte.";
          break;
        case 'auth/user-not-found':
          this.errorMessage = "Combinaison nom d'utilisateur / mot de passe incorrecte.";
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook()
    .then(() => {
      this.navCtrl.setRoot('TabsPage');
    }, (error) => {
      console.log(error);
    });
  }

  navigateTo(page) {
    this.navCtrl.push(page);
  }
}