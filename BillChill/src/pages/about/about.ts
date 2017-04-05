import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {



  constructor(public navCtrl: NavController, private platform: Platform, public storage: Storage,public alertCtrl: AlertController ) {
  }

public setData(data){
console.log("set data");
this.storage.set('Gruppenname', data);
  };
 
 public getData(){
this.storage.get('Gruppenname').then((data) =>{
  console.log(data);
});
    }

showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Gruppe hinzufügen',
        inputs: [
        {
          name: 'title',
          placeholder: 'Gruppenname'
        },
      ],
      buttons: [
        {
          text: 'Speichern',
          handler: data => {
            console.log('Speichern clicked');
            this.setData(data);
            
          }
        },
        {
          text: 'Abbrechen',
          handler: data => {
            console.log('Abbrechen clicked');
          }
        }
      ]
    });
    prompt.present();
  }

 

}









