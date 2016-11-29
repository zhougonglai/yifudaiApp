import { Component,ViewChild} from '@angular/core';
import { Storage} from "@ionic/storage";

import {NavParams, Slides, ModalController, Events} from 'ionic-angular';

import { InvesterComponent } from "../invester/invester";

import { Invest,User } from "../../model";

import { UserData} from "../../providers/user-data";

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
  backEnd:boolean = false;
  userOn:boolean;


  constructor(
    private params:NavParams,
    private userData:UserData,
    private storage:Storage,
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
    });
    events.subscribe("user:logout",() =>{
      this.userOn = false;
    });
  }
  // hook
  ionViewDidLoad() {
    this.userData.getStatus().then(bool => {
      this.userOn = bool;
    });
  }

  login(){
    this.userData.login();
  }

  openInvester(){
    let investerModal = this.modalCtrl.create(InvesterComponent,{invest:this.invest});
    this.backEnd = true;
    investerModal.onDidDismiss(() =>{
      this.backEnd = false;
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
