
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class FirebaseRequestProvider {

  constructor(private afdb: AngularFireDatabase) {
    console.log('Hello FirebaseRequestProvider');
  }

  get(url:string){
  	return this.afdb.list(url).valueChanges();
  }

  set(){

  }

}