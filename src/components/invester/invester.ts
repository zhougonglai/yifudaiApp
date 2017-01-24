import { Component } from '@angular/core';

import {ViewController, AlertController, NavParams, Events} from "ionic-angular";
import {Invest} from "../../providers/model/invest";
import {User} from "../../providers/model/user";
import {UserData} from "../../providers/user-data";
import {UserService} from "../../providers/user-service";
import {Utils} from "../../providers/utils";

@Component({
  selector: 'invester',
  templateUrl: 'invester.html'
})
export class InvesterComponent {
  invest:Invest;
  toppings:any;
  selectOptions:{};
  user:User;
  token:string;
  input:number;
  //earnings:预期收益 , personalPayMoney:个人支付 , czhb:充值红包
  userMessage:{earnings:number,personalPayMoney:number,czhb:number} = {earnings:0,personalPayMoney:0,czhb:0};
  userCoupons;
  hbAlert;
  selectCoupons:[number];

  constructor(
    public viewCtrl:ViewController,
    public alertCtrl:AlertController,
    private params:NavParams,
    private userData:UserData,
    private userService:UserService,
    private util:Utils,
    private events:Events
  ) {
    this.invest = params.get("invest");
    this.selectOptions = {
      title:"所有红包"
    };
    this.user = this.userData.getLocalUser();
    this.token = this.userData.getToken();
    if(this.user.coupons.length){
      this.userCoupons = this.user.coupons.map((coupon) => {
        return {
          id:coupon.id,
          value:coupon.id,
          type:"checkbox",
          label:(coupon.type == 1)?(coupon.money+"元充值红包"):(coupon.money+"元推广红包"),
          checked:false
        }
      });

    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onKeyUp(input:number){
    console.log(input);
    if(input >= 100&& (input %100) == 0 ){
      this.userService.Earnings(input,this.invest.borrowMoney,this.invest.totalInterest).subscribe(
        (data) => {
          this.userMessage.earnings = data;
        },
        (err) => {

        }
      );
      this.userService.PersonaPay(input,this.token).subscribe(
        (data) => {
          if("personalPayMoney" in data){
            this.userMessage.personalPayMoney = data["personalPayMoney"];
          }
          if("czhb" in data){
            this.userMessage.czhb = data["czhb"];
          }
        }
      );
    }else{
      this.userMessage = { earnings:0,personalPayMoney:0,czhb:0};
    }
  }

  showCheckBox(){
    if(this.userCoupons) {
      if (this.userCoupons.length > 0) {
        this.util.presentAlert({
          title: "所有红包",
          inputs: this.userCoupons,
          buttons: [
            {
              text: "取消",
              role: "Cancel"
            },
            {
              text: "确定",
              handler: (data) => {
                this.selectCoupons = data;
                this.userCoupons.forEach((coupon) => {
                  coupon['checked'] = false;
                });
                this.selectCoupons.forEach((key) => {
                  this.userCoupons.map((coupon) => {
                    if (coupon["id"] == key) {
                      coupon['checked'] = true;
                    }
                  });
                });
              }
            },
            {
              text:"不使用红包",
              handler:() => {
                this.selectCoupons = null;
              }
            }
          ]
        })
      }
    }else{
      this.util.toastShow("账户没有红包");
    }
  }

  buy(input){
    if(this.selectCoupons){
      // 使用了个人红包 0元起,100整数倍    @input:输入金额 + @selectCoupons:选中的红包 [Id]
      if(this.selectCoupons.length>0 || (input >= 0 && (input%100 == 0))){
        this.userService.buy(this.token,this.invest.id.toString(),input.toString(),this.selectCoupons.toString())
          .subscribe(
            (data) => {
              if("message" in data && "status" in data){
                this.util.toastShow(data["message"]);
                switch (data["status"]){
                  case "error":
                    break;
                  case "success":
                    this.dismiss();
                    this.events.publish("invest:done");
                    break;
                }
              }

            },(err) => {
              console.log(err);
            });
      }else {
        this.util.toastShow("投资金额不合法");
      }
    }else{
      // 没使用个人红包 @input:输入金额 >= 100 && 100的整数倍
      if(input >= 100 && (input%100 == 0)){
        this.userService.buy(this.token,this.invest.id.toString(),input.toString(),"null")
          .subscribe(
            (data) => {
              if("message" in data && "status" in data){
                this.util.toastShow(data["message"]);
                switch (data["status"]){
                  case "error":
                    break;
                  case "success":
                    this.dismiss();
                    this.events.publish("invest:done");
                    break;
                }
              }
            },(err) => {
              console.log(err);
            });
      }else {
        this.util.toastShow("投资金额不合法");
      }
    }
  }

}
