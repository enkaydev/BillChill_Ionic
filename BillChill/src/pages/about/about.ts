import { Component, NgZone } from '@angular/core';

import { NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite  } from '@ionic-native/sqlite';
import { DBService } from '../../services/db.service'; 
import { GroupsPage } from '../groups/groups';  
import { AusgabenPage } from "../ausgaben/ausgaben";  
import { ContactPage } from '../contact/contact';
import { Storage } from '@ionic/storage';
// #####################################################



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 data:any ;
public Groups= [];

  constructor(
  public navCtrl: NavController,
  private platform: Platform, 
  
  public alertCtrl: AlertController, 
  private sqlite: SQLite, 
  
  private toastCtrl: ToastController, 
  private dbService: DBService,
  private zone: NgZone,
  private modalCtrl: ModalController,
  private storage: Storage) {

 
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



    save() {
       this.dbService.add(this.Groups)
                .catch(console.error.bind(console));
    }

    delete() {
        this.dbService.delete(this.Groups)
            .catch(console.error.bind(console));
         }

showDetail(group) {
        let modal = this.modalCtrl.create(GroupsPage, { groups: group });
        modal.present();
    }

    openAusgaben(group){
let modal1 = this.modalCtrl.create(ContactPage, { groups: group  });
 modal1.present();
    }
 
 


//#######################################################################################
// Add Group Pop Up Fenster
public showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Gruppe hinzufügen',
        inputs: [
        {
          name: 'Name',
          placeholder: 'Gruppenname'
        },

        {
          name: 'Member',
          placeholder: 'Mitglied1'
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

public setCurrentGroup(group){

   this.storage.set('Groupname', group);
   console.log("Gruppe als Aktiv gesetzt", group);
 }

 public getCurrentGroup(){

   this.storage.get('Groupname').then((val) => {
    console.log('Der Name der Gruppe ist', val);
    console.log('Keys sind:', this.storage.keys())
   });
 }

}









