import { Component} from '@angular/core';
import { NavController,AlertController,Events,ToastController,ModalController} from 'ionic-angular';

import { Storage} from "@ionic/storage";

import { UserData} from "../../providers/user-data";
import { User } from "../../providers/model";
import { LoginComponent} from "../../components/login/login";
import {AccountCardPage} from "./account-card/account-card";
import {AcountUserPage} from "./acount-user/acount-user";
import {AccountBalancePage} from "./account-balance/account-balance";
import {AccountInvestPage} from "./account-invest/account-invest";
import {AutoInvestPage} from "./auto-invest/auto-invest";
import {AccountEarningsPage} from "./account-earnings/account-earnings";
import {AccountInvitePage} from "./account-invite/account-invite";
import {Utils} from "../../providers/utils";
import {UserService} from "../../providers/user-service";
import { InAppBrowser} from "ionic-native";


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
  token:string;
  browser:InAppBrowser;

  constructor(
    public navCtrl: NavController,
    public storage:Storage,
    public userData:UserData,
    public alertCtrl:AlertController,
    public events:Events,
    public toast:ToastController,
    public modalCtrl:ModalController,
    private util:Utils,
    private userService:UserService
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
    this.navCtrl.push(AccountBalancePage,{balance:this.user.money});
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
    this.token = this.userData.getToken();
    if(this.token){
      this.navCtrl.push(AutoInvestPage,{token:this.token});
    }else{
      this.userData.login();
    }
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

  //实名认证
  certification(){
    if(this.user){
      if(this.user.identityAuthentication){
        this.util.presentAlert({
          title:"用户已实名",
          buttons:["确定"]
        });
      }else{
        this.token = this.userData.getToken();
        if(this.token){
          this.util.presentAlert({
            title:"实名认证",
            inputs:[
              {
                name:"realName",
                placeholder:"真实姓名"
              },
              {
                name:"idCardNumber",
                placeholder:"身份证号",
                type:"tel"
              }
            ],
            buttons:[
              {
                text:"取消",
                role:"cancel"
              },
              {
                text:"确定",
                handler:data=>{
                  if(data.realName && data.idCardNumber){
                    if(data.realName.length>1 && data.idCardNumber.length == 18){
                      this.userService.certification(this.token,data.realName,data.idCardNumber).subscribe(
                        (data) => {
                          if("status" in data){
                            this.util.toastShow(data["message"]);
                            if(data["status"] == 'success'){
                              this.userData.getUserFormService(this.token);
                            }
                          }
                        },(err) => {

                        }
                      );
                    }else{
                      this.util.toastShow("真实姓名或身份证号格式不对");
                    }
                  }
                }
              }
            ]
          });
        } else {
          this.userData.login();
        }
      }
    } else {
      this.userData.login();
    }
  }

  // 设置支付密码
  queryIsSetPayPasswordRequest(){
    if(this.user){
      if(this.user.queryIsSetPayPasswordRequest){
        this.util.presentAlert({
          title:"用户已设置支付密码",
          buttons:["确定"]
        });
      }else{
        if(this.user.identityAuthentication) {
          this.token = this.userData.getToken();
          if (this.token) {
            this.userService.setPaymenyPassword(this.token).subscribe(
              (data) => {
                console.log(data);
                if ("message" in data) {
                  if (data["message"] == "SUCCESS") {
                    data["data"] = JSON.parse(data["data"]);
                    this.util.toastShow(data["data"]["url"]);
                    this.openBrowser(data["data"]["url"]);
                  } else {
                    this.util.presentAlert({
                      title: data["message"],
                      buttons: ["确定"]
                    });
                  }
                }
              }, (err) => {

              }
            );
          } else {
            this.userData.login();
          }
        }else{
          this.util.presentAlert({
            title:"请先实名认证",
            buttons:["确定"]
          });
        }
      }
    } else {
      this.userData.login();
    }
  }

  // 余额支付
  isAuthorization(){
   if(this.user){
     if(this.user.isAuthorization){
       this.util.presentAlert({
         title:"用户已开通余额支付",
         buttons:["确定"]
       });
     }else{
       if(this.user.queryIsSetPayPasswordRequest) {
         this.token = this.userData.getToken();
         if (this.token) {
           this.userService.setPaymenyPassword(this.token).subscribe(
             (data) => {
               console.log(data);
               if ("message" in data) {
                 if (data["message"] == "SUCCESS") {
                   data["data"] = JSON.parse(data["data"]);
                   this.util.toastShow(data["data"]["url"]);
                   this.openBrowser(data["data"]["url"]);
                 } else {
                   this.util.presentAlert({
                     title: data["message"],
                     buttons: ["确定"]
                   });
                 }
               }
             }, (err) => {

             }
           );
         } else {
           this.userData.login();
         }
       }else{
         this.util.presentAlert({
           title:"请先设置支付密码",
           buttons:["确定"]
         });
       }
     }
   } else {
     this.userData.login();
   }
  }

  openBrowser(url:string){
    this.browser = new InAppBrowser(url,'_blank','location=yes');
    this.browser.show();
    this.browser.on('exit').subscribe(()=>{
      this.userData.getUserFormService(this.token);
    });
  }

  // 页面进入
  ionViewWillEnter(){
    this.userData.getStatus().then(bool =>{
      this.userOn = bool;
      if(bool){
        this.userData.getUserData()
          .then(user => {
            this.user = <User>user;
            console.log(this.user);
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
  }

}
