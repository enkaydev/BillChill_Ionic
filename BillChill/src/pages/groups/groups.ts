import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams , ViewController } from 'ionic-angular';
import { DBService } from '../../services/db.service'; 
import { DBService1 } from '../../services/db.service.1'; 


@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {
    public button: any;
    public groups: any = {};
    public isNew = true;
    public action = 'hinzufügen';
    public isoDate = '';
   @ViewChild('Members') Members;

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private dbService: DBService,
        private viewCtrl: ViewController,) {}

  ionViewDidLoad() {
    let editGroup = this.navParams.get('groups');

        if (editGroup) {
            this.groups = editGroup;
            this.isNew = false;
            this.action = "bearbeiten";
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

    addMember(){

        this.Members.nativeElement = "Test"
    }
}
