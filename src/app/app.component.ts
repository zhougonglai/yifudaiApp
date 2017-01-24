import { Component } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { UserData} from "../providers/user-data";

import { TabsPage } from '../pages/tabs/tabs';
import { Storage} from "@ionic/storage";
import { User } from "../providers/model";
import { Utils } from "../providers/utils";


@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="true" [class.filt]="backEnd"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  user:User;
  backEnd:boolean = false;

  constructor(platform: Platform,storage:Storage,public events:Events,public userData:UserData,public utils:Utils) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    platform.resume.subscribe(()=>{
      this.utils.presentAlert({
        title:"resume",
        subTitle:"拉回",
        buttons:["确定"]
      });
    });



    events.subscribe("user:logError",([message]) =>{
      this.utils.toastShow(message);
    });

    events.subscribe("toggle:backEnd",([bool]) =>{
      console.log(bool);
      this.backEnd = bool;
    });
  }
}
