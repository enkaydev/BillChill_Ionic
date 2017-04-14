import { Component, NgZone } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController, Platform,ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DBService } from '../../services/db.service'; 
import { AusgabenPage } from '../ausgaben/ausgaben'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController, 
    private sqlite: SQLite, 
    private toastCtrl: ToastController, 
    private dbService: DBService,
    private zone: NgZone,
    private modalCtrl: ModalController, ) { 

  }

showDetail(group) {
        let modal = this.modalCtrl.create(AusgabenPage, { groups: group });
        modal.present();
    }

}
