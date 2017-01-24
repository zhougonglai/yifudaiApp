import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage} from "./map/map";
import { PaperPage} from "./paper/paper";

import { Invest,TransferCreditor} from "../../providers/model";

import {InAppBrowser, ThemeableBrowser, SafariViewController} from "ionic-native";
// import { UserService,Utils} from "../../providers";
import { UserService } from "../../providers/user-service";
import { Utils } from "../../providers/utils";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides:{};
  slide:[string];
  sanbiao:Invest;
  xiaofei:Invest;
  zhuanrang:TransferCreditor;

  isDone:boolean = false;


  constructor(public navCtrl: NavController,public userService: UserService,public utils:Utils) {
    this.slides = {
      autoplay:4000,
      loop:true,
      pager:true
    };
    this.slide = [
      "http://www.gbtags.com/gb/laitu/400x200","http://www.gbtags.com/gb/laitu/400x200","http://www.gbtags.com/gb/laitu/400x200"
    ];

    userService.getDataList().subscribe(
      (remote) => {
        if("message" in remote){
          if(remote["message"] == "SUCCESS"){
            remote["data"] = JSON.parse(remote["data"]);

            setTimeout(()=>{
              this.isDone = true;
            },2000);

            console.log(remote["data"]);

            if("sb" in remote["data"]){
              this.sanbiao = remote["data"]["sb"];
            }
            if("xf" in remote["data"]){
              this.xiaofei = remote["data"]["xf"];
            }
            if("zr" in remote["data"]){
              this.zhuanrang = remote["data"]["zr"];
            }
          }
        }
      },(err) => {
        console.log(err);
      });
  }

  openBrowser(){
    let browser = new InAppBrowser('https://www.baidu.com/?fn=1425df-241-dfseeg-24sdg','_self');
    browser.show();
    browser.on("exit").subscribe(() =>{
      this.utils.presentAlert({
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

  openTheMeBrowser(){
    let options = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        staticText:'Browser',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          image: 'share',
          imagePressed: 'share_pressed',
          align: 'right',
          event: 'sharePressed'
        }
      ],
      menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
          {
            event: 'helloPressed',
            label: 'Hello World!'
          },
          {
            event: 'testPressed',
            label: 'Test!'
          }
        ]
      },
      backButtonCanClose: true
    };

    let browser = new ThemeableBrowser('https://www.baidu.com/?fn=1425df-241-dfseeg-24sdg', '_blank', options);

    browser.show();
  }

  openSafariBrowser(){
    SafariViewController.isAvailable()
      .then(
        (available: boolean) => {
          if(available){

            SafariViewController.show({
              url: 'https://www.baidu.com/?fn=1425df-241-dfseeg-24sdg',
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
              .then(
                (result: any) => {
                  if(result.event === 'opened'){

                  }else if(result.event === 'loaded'){

                  }else if(result.event === 'closed'){

                  }
                },
                (error) => {

                }
              );

          } else {
            // use fallback browser, example InAppBrowser
            this.openBrowser();
          }
        }
      );
  }



  goToMap(){
    this.navCtrl.push(MapPage);
  }

  goToPaper(){
    this.navCtrl.push(PaperPage);
  }

}
