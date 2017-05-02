import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { DBService } from '../../services/db.service'; 
import { DBService1 } from '../../services/db.service.1'; 
@Component({
  selector: 'page-ausgaben',
  templateUrl: 'ausgaben.html'
})
export class AusgabenPage {
    public button: any; 
    public ausgaben: any = {};
    public isNew = true;
    public action = 'hinzufügen ';
    public isoDate = '';
   public currentGroup: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DBService,
    private dbService1: DBService1,
    private viewCtrl: ViewController,) {}

  ionViewDidLoad() {
    let editAusgaben = this.navParams.get('ausgaben');
this.currentGroup = this.navParams.get('group');
console.log(this.currentGroup);

        if (editAusgaben) {
            this.ausgaben = editAusgaben;
            this.isNew = false;
            this.action = 'bearbeiten';
            this.isoDate = this.ausgaben.Date.toISOString().slice(0, 10);
        }
  }
save() {
        this.ausgaben.Date = new Date();
        if (this.isNew) {
            this.dbService1.add(this.ausgaben)
                .catch(console.error.bind(console));
        } else {
            this.dbService1.update(this.ausgaben)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    delete() {
        this.dbService1.delete(this.ausgaben)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.ausgaben);
    }
    
}