import { Component } from '@angular/core';
import {NavController, Events, AlertController} from 'ionic-angular';
import {BorrowStepPage} from "./borrow-step/borrow-step";
import {User} from "../../providers/model/user";
import {UserData} from "../../providers/user-data";
import {Utils} from "../../providers/utils";


@Component({
  selector: 'page-borrow',
  templateUrl: 'borrow.html'
})
export class BorrowPage {
  user:User;
  userOn:boolean;
  token:string;

  constructor(public navCtrl: NavController,private userData:UserData,private events:Events,private alertCtrl:AlertController,private util:Utils) {
    events.subscribe("user:login",([user]) =>{
      this.user = user;
      this.userOn = true;
      this.token = userData.getToken();
    });
    events.subscribe("user:logout",() => {
      this.user = null;
      this.userOn = false;
    });
  }

  ionViewDidLoad() {
    this.userData.getStatus().then(bool =>{
      this.userOn = bool;
      if(bool){
        this.userData.getUserData()
          .then(user => {
            this.user = <User>user;
            this.token = this.userData.getToken();
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

  borrowStep(id:number){
    if(this.token){
      if(this.user.identityAuthentication){
        if(this.user.queryIsSetPayPasswordRequest){
          if(this.user.isAuthorization){
            this.navCtrl.push(BorrowStepPage,{id:id,token:this.token});
          }else{
            this.util.presentAlert({
              title:"用户未设置余额支付",
              buttons:["确定"]
            });
          }
        }else{
          this.util.presentAlert({
            title:"用户未设置支付密码",
            buttons:["确定"]
          });
        }
      }else{
        this.util.presentAlert({
          title:"用户未实名",
          buttons:["确定"]
        });
      }
    }else{
      this.userData.login();
    }
  }

}
