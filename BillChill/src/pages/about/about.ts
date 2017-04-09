import { Component, } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform,ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public navCtrl: NavController, private platform: Platform, public storage: Storage,public alertCtrl: AlertController, private sqlite: SQLite, private toastCtrl: ToastController ) {

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

data.db.executeSql('Insert Into Groups(Testgruppe)', {})

  };
 
 public getData(){
this.storage.get('Gruppenname').then((data) =>{
  console.log(data);
  //console.log(data.db.executeSql('Select * From Groups', {}));




  
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
            this.presentToast('Gruppe erfolgreich hinzugefügt!')
          
          }
        },
        {
          text: 'Abbrechen',
          handler: data => {
            console.log('Abbrechen clicked');
            this.presentToast('Abbruch')
          }
        }
      ]
    });
    prompt.present();


    
  }

 
public presentToast(Messagetoshow) {
  let toast = this.toastCtrl.create({
    message: Messagetoshow,
    duration: 1200,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}




 

}









