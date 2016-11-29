import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage} from "./map/map";
import { PaperPage} from "./paper/paper";

import { Invest} from "../../model";

import { InAppBrowser } from "ionic-native";

import { UserData} from "../../providers/user-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides:{};
  slide:[string];
  invests:[Invest];


  constructor(public navCtrl: NavController,private userService:UserData) {
    this.slides = {
      autoplay:4000,
      loop:true,
      pager:true
    };
    this.slide = [
      "http://www.gbtags.com/gb/laitu/400x200","http://www.gbtags.com/gb/laitu/400x200","http://www.gbtags.com/gb/laitu/400x200"
    ];
    this.invests = [
      {
        title:"电子商务公司资金周转",
        mark:"1",
        money:100000,
        level:"A",
        rate:9.3,
        date:12,
        existed:10000
      },
      {
        title:"个人欧洲10国旅游分期",
        mark:"2",
        money:40000,
        level:"AA",
        rate:9.2,
        date:12,
        existed:21000
      },
      {
        title:"电子商务公司资金周转",
        mark:"4",
        money:560000,
        level:"B",
        rate:9.6,
        date:12,
        existed:20000
      }
    ];
  }

  openBrowser(){
    let browser = new InAppBrowser("https://www.baidu.com","_blank",'location=yes');
    browser.show();
    browser.on("exit").subscribe(() =>{
      this.userService.presentAlert({
        title:"关闭浏览器",
        subTitle:"test",
        message:"关闭浏览器测试",
        buttons:[
          {
            text:"确定",
            handler:() =>{

            }
          }
        ]
      });
    });
  }

  goToMap(){
    this.navCtrl.push(MapPage);
  }

  goToPaper(){
    this.navCtrl.push(PaperPage);
  }

}
