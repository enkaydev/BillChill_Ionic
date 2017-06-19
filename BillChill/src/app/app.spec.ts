import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GroupsPage } from '../pages/groups/groups';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { AusgabenPage } from '../pages/ausgaben/ausgaben';
import { TabsPage } from '../pages/tabs/tabs';
 
let comp: MyApp;
let fixture: ComponentFixture<MyApp>;


 
describe('Groups Page', () => {

    let isNew = true;
    let groupx = null;
    let editGroup = null;

    beforeEach(() => {
       groupx = new GroupsPage();
    });
 
    it('EditThisGroup', () => {

        let editGroup = true;
        expect(this.groups == editGroup).not.toBeTruthy();
    
    });

    it('IsNewCheck', () => {

        expect(groupx.isNew).toBeTruthy;

    })

    it('Edit Group enabled', () => {

        //let group = groupx.ionViewDidLoad()
        let editGroup = this.navParams

        expect(this.groups == {}).toBeTruthy;
        
    })

});
describe('Contact Page', () => {

    let contactx = null;
    beforeEach(() => {
       contactx = new ContactPage();
    });

    it('Ausgaben Array initial', () => {

        expect(contactx.Ausgaben == []).toBeTruthy;    
    });

    it('DB Check', () => {

        let ausgabe = 'X'

        expect(contactx.dbService).toBeDefined;    
    });
});

describe('Tabs Darstellung', () => {

    let tabspagex = null;
    beforeEach(() => {
       tabspagex = new TabsPage();
    });

    it('Darstellung der Seiten richtig?', () => {

        expect(tabspagex.tab1Root == HomePage).toBeTruthy; 
        expect(tabspagex.tab2Root == AboutPage).toBeTruthy; 
        expect(tabspagex.tab3Root == ContactPage).toBeTruthy; 
 
    });
});

describe('AboutPage', () => {

    let abouty = null;
    let aboutx = null;
    let any = null;
    
    beforeEach(() => {
       aboutx = new AboutPage();
    });

    it('Page Selector right', () => {

        expect(aboutx.selector == 'page-about').toBeTruthy;

    });

    it('Check Group Array', () => {

        expect(aboutx. Groups= []).toBeUndefined;

    });

    it('SQL implement Check',() => {

        expect(aboutx.sqlite).toBeDefined;

    });

    it('Testting Storage Func', () => {

        let message = "This is a message";

        expect(this.storage).toBeTruthy

    });
});

describe('HomePage', () => {

    let homex = null;
    beforeEach(() => {
       homex = new HomePage();
    });
    let nativeElemten = null;

    it('Darstellung der Seiten richtig?', () => {

        expect(homex.barChart).toBeDefined; 
 
    });

    it('Constructor vorhanden?', () => {

        expect(homex.constructor).toBeDefined; 
 
    });

   
});