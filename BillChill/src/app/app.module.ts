import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GroupsPage } from '../pages/groups/groups';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DBService } from '../services/db.service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GroupsPage,
   
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
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
   
    
   
    {provide: ErrorHandler, useClass: IonicErrorHandler},DBService, SQLite,
  ]
})
export class AppModule {}
