import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionPage } from './description-capteur';

@NgModule({
  declarations: [
    DescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionPage),
  ],
})
export class DescriptionCapteurPageModule {}
