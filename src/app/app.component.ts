import { Component } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { UserData} from "../providers/user-data";

import { TabsPage } from '../pages/tabs/tabs';
import { Storage} from "@ionic/storage";
import { User } from "../model";

@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="true"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  user:User;

  constructor(platform: Platform,storage:Storage,public events:Events,public userData:UserData) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    events.subscribe("user:logError",([message]) =>{
      this.userData.toastShow(message);
    });

    events.subscribe("exit",()=>{
      storage.set("exit","exit");
    });

    events.subscribe("exitApp",()=>{
      storage.set("exitApp","exitApp");
    });

    storage.get("exitApp").then(val =>{
      if (val){
        userData.presentAlert({
          title:"exitApp",
          buttons:["确定"]
        });
      }
    });

    storage.get("exit").then(val =>{
      if (val){
        userData.presentAlert({
          title:"exit",
          buttons:["确定"]
        });
      }
    });
  }
}
