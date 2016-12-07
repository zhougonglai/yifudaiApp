import { Component} from '@angular/core';
import { NavController,AlertController,Events,ToastController,ModalController} from 'ionic-angular';

import { Storage} from "@ionic/storage";

import { UserData} from "../../providers/user-data";
import { User } from "../../model";
import { LoginComponent} from "../../components/login/login";
import {AccountCardPage} from "./account-card/account-card";
import {AcountUserPage} from "./acount-user/acount-user";
import {AccountBalancePage} from "./account-balance/account-balance";
import {AccountInvestPage} from "./account-invest/account-invest";
import {AutoInvestPage} from "./auto-invest/auto-invest";
import {AccountEarningsPage} from "./account-earnings/account-earnings";
import {AccountInvitePage} from "./account-invite/account-invite";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage{
  money:number;
  balance:number;
  user:User;
  HAS_LOGGED_IN = "hasLoggedIn";
  alert:AlertController;
  userOn:boolean;
  privacy:boolean;

  constructor(
    public navCtrl: NavController,
    public storage:Storage,
    public userData:UserData,
    public alertCtrl:AlertController,
    public events:Events,
    public toast:ToastController,
    public modalCtrl:ModalController
  ) {
    this.money = 10000;
    this.balance = 524;

    events.subscribe("user:login",([user]) =>{
      this.user = user;
      this.userOn = true;
    });
    events.subscribe("user:logout",() => {
      this.user = null;
      this.userOn = false;
    });
    events.subscribe("togglePrivacy",([bool]) =>{
      this.privacy = bool;
    });
  }

  toggleMask(){
    this.userData.setPrivacy(!this.privacy);
  }

  goToAccountUser(){
    this.navCtrl.push(AcountUserPage);
  }

  goToAccountBalance(){
    this.navCtrl.push(AccountBalancePage);
  }

  goToAccountCard(){
    this.navCtrl.push(AccountCardPage);
  }

  goToAccountInvest(){
    this.navCtrl.push(AccountInvestPage);
  }

  goToAccountInvite(){
    this.navCtrl.push(AccountInvitePage);
  }

  goToAutoInvest(){
    this.navCtrl.push(AutoInvestPage);
  }

  goToAccountEarningsPage(){
    this.navCtrl.push(AccountEarningsPage);
  }

  login(){
    let loginPage = this.modalCtrl.create(LoginComponent);
    loginPage.present();
  }

  updateUser(user:User){
    this.user = user;
    this.storage.set("user",user);
  }

  logout(){
    this.userData.logout();
  }

  ionViewDidLoad() {
    this.userData.privacyStatus().then(bool =>{
      this.privacy = bool?bool:false;
    });
  }

  ionViewWillEnter(){
    this.userData.getStatus().then(bool =>{
      this.userOn = bool;
      if(bool){
        this.userData.getUserData()
          .subscribe(user => {
            this.user = <User>user;
          },error =>{
            let alert = this.alertCtrl.create({
              title:"提示",
              subTitle:"网络状况不佳,请稍后再试",
              buttons:["确定"]
            });
            alert.present();
          })
      }else{
        this.userData.login();
      }
    });
    // this.storage.get("user").then(user =>{
    //   console.log(user);
    //   if(user){
    //     this.userData.getUser().then(user =>{
    //       this.user = user;
    //       this.storage.set("user",user);
    //       console.log("user on");
    //     });
    //   }else{
    //     this.login();
    //   }
    // });
  }

}
