
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Http, Response } from '@angular/http';

@Injectable()
export class FirebaseRequestProvider {

  item:string;

  constructor(private afdb: AngularFireDatabase) {
    console.log('Hello FirebaseRequestProvider');
  }

  get(url:string){
    return this.afdb.list(url).valueChanges();
  }

  getObj(url:string){
  	return this.afdb.object(url).valueChanges();
  }
  set(url:string, value:string){
  	return this.afdb.object(url).set(value);
  }

}