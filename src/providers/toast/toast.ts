import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toasCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  show(message: string, duration: number = 3000){
    return this.toasCtrl.create({
      message,
      duration,
    })
    .present();
  }

}
