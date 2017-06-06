import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GroupsPage } from '../pages/groups/groups';
import { AusgabenPage } from '../pages/ausgaben/ausgaben';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DBService } from '../services/db.service';
import { DBService1 } from '../services/db.service.1';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GroupsPage,
    AusgabenPage,
     ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GroupsPage,
    AusgabenPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},DBService,DBService1, SQLite, 
  ]
})
export class AppModule {}
