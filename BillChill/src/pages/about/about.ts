import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {



  constructor(public navCtrl: NavController, private platform: Platform, public storage: Storage, ) {

  }

  setData(){
console.log("set data");
  };

  getData(){
console.log("get data");
  };
}
