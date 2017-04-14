import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { DBService } from '../../services/db.service'; 

@Component({
  selector: 'page-ausgaben',
  templateUrl: 'ausgaben.html'
})
export class AusgabenPage {
    public button: any; 
    public groups: any = {};
    public isNew = true;
    public action = 'hinzufügen';
    public isoDate = '';
   
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DBService,
    private viewCtrl: ViewController,) {}

  ionViewDidLoad() {
    let editAusgaben = this.navParams.get('ausgaben');

        if (editAusgaben) {
            this.groups = editAusgaben;
            this.isNew = false;
            this.action = 'bearbeiten';
            this.isoDate = this.groups.Date.toISOString().slice(0, 10);
        }
  }
save() {
        this.groups.Date = new Date();
        if (this.isNew) {
            this.dbService.add(this.groups)
                .catch(console.error.bind(console));
        } else {
            this.dbService.update(this.groups)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    delete() {
        this.dbService.delete(this.groups)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.groups);
    }
    
}