import { Component, NgZone } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform,ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DBService } from '../../services/db.service';  
//#####################################################



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

public Groups= [];

  constructor(
  public navCtrl: NavController,
  private platform: Platform, 
  public storage: Storage,
  public alertCtrl: AlertController, 
  private sqlite: SQLite, 
  private toastCtrl: ToastController, 
  private dbService: DBService,
  private zone: NgZone,
  private modalCtrl: ModalController,) {

 
  }

  ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.dbService.initDB();

            this.dbService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.Groups = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    

//########################################################################################
public setData(data){ };

//######################################################################################## 
public getData(){ };

//#######################################################################################
// Add Group Pop Up Fenster
public showPrompt() {
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
            this.dbService.add(data);
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

//######################################################################################
//Toast Funktion 
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









