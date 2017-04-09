import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {



  constructor(public navCtrl: NavController, private platform: Platform, public storage: Storage,public alertCtrl: AlertController, private sqlite: SQLite ) {

this.sqlite.create({
  name: 'data.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


    db.executeSql('create table Groups(name VARCHAR(32))', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));


  })
  .catch(e => console.log(e));








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









