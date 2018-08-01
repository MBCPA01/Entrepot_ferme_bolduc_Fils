import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'LoginPage';

  constructor(private alertCtrl: AlertController,private network: Network,private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.listenConnection();
    });
  }

  private listenConnection(): void {
    if(this.network.onDisconnect()){
      console.log(this.network.onDisconnect());
      this.showAlert();
    }
    if(this.network.onConnect()){
      console.log("onConnect");
      
    }
  }

  private showAlert(): void {
      let alert = this.alertCtrl.create({
        title: 'Lost internet connection',
        buttons: ['Dismiss']
      });
      alert.present();
  }

}

