import { Component, NgZone } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform,ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite  } from '@ionic-native/sqlite';
import { DBService } from '../../services/db.service'; 
import { AusgabenPage } from '../ausgaben/ausgaben'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
data: any;
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



    save() {
       this.dbService.add(this.Groups)
                .catch(console.error.bind(console));
    }

    delete() {
        this.dbService.delete(this.Groups)
            .catch(console.error.bind(console));
         }

showDetail(groups) {
        let modal = this.modalCtrl.create(AusgabenPage, { Groups: groups  });
        modal.present();
    }

}
