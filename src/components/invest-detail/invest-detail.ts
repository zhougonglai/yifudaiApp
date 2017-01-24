import { Component,ViewChild} from '@angular/core';
import { Storage} from "@ionic/storage";

import {NavParams, Slides, ModalController, Events} from 'ionic-angular';

import { InvesterComponent } from "../invester/invester";

import { Invest,User } from "../../providers/model";

import { UserData} from "../../providers/user-data";
import {BackendComponent} from "../backend/backend";
import {Utils} from "../../providers/utils";

@Component({
  selector: 'invest-detail',
  templateUrl: 'invest-detail.html'
})
export class InvestDetailComponent {

  invest:Invest;
  slideOptions:{};
  slideIndex:string = "0";
  user:User;
  @ViewChild("sliderDetail") slider:Slides;

  userOn:boolean;


  constructor(
    private params:NavParams,
    private userData:UserData,
    private storage:Storage,
    private util:Utils,
    public events:Events,
    public modalCtrl:ModalController
  ) {
    this.invest = params.get("invest");
    this.slideOptions = {
      direction:"vertical"
    };

    events.subscribe("user:login",([user]) =>{
      this.user = user;
      this.userOn = true;
      let investerPermission = this.userData.checkUserInvestPermission(this.user);
      console.log("投资资格",investerPermission);
      if(investerPermission){
        this.goToInvester();
      }else{
        this.util.toastShow("尚未开通相关认证");
      }
    });
    events.subscribe("user:logout",() =>{
      this.userOn = false;
    });
    console.log(this.user);
  }
  // hook
  ionViewDidLoad() {
    this.userData.getStatus().then(bool => {
      this.userOn = bool;
    });
  }

  showDetailPage(){
    let messageDetail = this.modalCtrl.create(BackendComponent);
    this.events.publish("toggle:backEnd",true);
    messageDetail.onDidDismiss(() =>{
      this.events.publish("toggle:backEnd",false);
    });
    messageDetail.present();
  }

  login(){
    this.userData.login();
  }

  openInvester(){
    let token = this.userData.getToken();
    if(token){
      this.userData.getUserFormService(token);
    }else{
      this.userData.login();
      console.log("登录状态失效");
    }
  }

  goToInvester(){
    let investerModal = this.modalCtrl.create(InvesterComponent,{
      invest:this.invest
    });
    this.events.publish("toggle:backEnd",true);
    investerModal.onDidDismiss(() =>{
      this.events.publish("toggle:backEnd",false);
    });
    investerModal.present();
  }

  onSlideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    this.slideIndex = currentIndex.toString();
  }

  goToDetail(index){
    this.slider.slideTo(parseInt(index));
  }
}
