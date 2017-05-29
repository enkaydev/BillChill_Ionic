import { Component, NgZone } from '@angular/core';
import { NavController, Platform,ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite  } from '@ionic-native/sqlite';
import { DBService } from '../../services/db.service'; 
import { DBService1 } from '../../services/db.service.1'; 
import { AusgabenPage } from '../ausgaben/ausgaben'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
data: any;
public Ausgaben= [];
  constructor(
  public navCtrl: NavController,
  private platform: Platform, 
  public alertCtrl: AlertController, 
  private sqlite: SQLite, 
  private toastCtrl: ToastController, 
  private dbService: DBService,
  private dbService1: DBService1,
  private zone: NgZone,
  private modalCtrl: ModalController,) {



  }

ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.dbService1.initDB();
        
            this.dbService1.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.Ausgaben = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }


    save() {
       this.dbService.add(this.Ausgaben)
                .catch(console.error.bind(console));
    }

    delete() {
        this.dbService.delete(this.Ausgaben)
            .catch(console.error.bind(console));
         }

showDetail(ausgaben) {
        let modal = this.modalCtrl.create(AusgabenPage, { ausgaben: ausgaben  });
        modal.present();
    }

}
