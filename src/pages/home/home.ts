import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage} from "./map/map";
import { PaperPage} from "./paper/paper";

import { Invest,TransferCreditor} from "../../providers/model";

// import { UserService,Utils} from "../../providers";
import { UserService } from "../../providers/user-service";
import { Utils } from "../../providers/utils";
import {SaveTyPage} from "./save-ty/save-ty";
import {InveterPage} from "./inveter/inveter";


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
      "./assets/imgs/banner/banner_uplevel.jpg",
      "./assets/imgs/banner/banner_coupon.jpg",
      "./assets/imgs/banner/banner_savety.jpg"
    ];

    this.getDataList();
  }

  getDataList(){
    this.userService.getDataList().subscribe(
      (remote) => {
        if("message" in remote){
          if(remote["message"] == "SUCCESS"){
            remote["data"] = JSON.parse(remote["data"]);

            setTimeout(()=>{
              this.isDone = true;
            },2000);

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

      });
  }

  doRefresh(refresher){
    this.isDone = false;
    //  -- refresh start
    this.getDataList();
    // -- refresh end


    setTimeout(() => {
      this.isDone = true;
      refresher.complete();
    },2000);
  }


  goToMap(){
    this.navCtrl.push(MapPage);
  }

  goToInveterPage(){
    this.navCtrl.push(InveterPage);
  }

  goToPaper(){
    this.navCtrl.push(PaperPage);
  }

  goToSaveTy(){
    this.navCtrl.push(SaveTyPage);
  }

}
