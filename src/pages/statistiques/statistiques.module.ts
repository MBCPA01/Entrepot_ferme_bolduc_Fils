import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatistiquesPage } from './statistiques';

@NgModule({
  declarations: [
    StatistiquesPage,
  ],
  imports: [
    IonicPageModule.forChild(StatistiquesPage),
  ],
})
export class StatistiquesPageModule {}
