import { Component } from '@angular/core';
import {ViewController, NavParams, Events} from 'ionic-angular';
import {UserService} from "../../../../providers/user-service";
import {Bank, User} from "../../../../providers/model/user";
import {City} from "../../../../providers/model/index";
import {Utils} from "../../../../providers/utils";
import {UserData} from "../../../../providers/user-data";


@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html'
})
export class AddCardPage {
  bank:Bank;
  province:City;
  city:City;
  cardno:number;
  phone:number;
  code:number;
  step:number = 1;
  banks:[Bank];
  citys:[City];
  provinces:[City];
  token:string;
  user:User;
  // 验证码模型;
  verycode:{status:boolean,text:string,timers:number,send:boolean,veryphone:boolean} = {status:false,text:"发送验证码",timers:60,send:false,veryphone:false};

  constructor(public viewCtrl: ViewController,private userService:UserService,private util:Utils,params:NavParams,userData:UserData,private events:Events) {
    this.token = params.get("token");
    userData.getUserFormService(this.token);
    events.subscribe("user:login",([user]) => {
      this.user = user;
    });

    events.subscribe("user:err",()=>{
      this.dismiss();
    });
  }

  nextStep(){
    if(this.user){
      if(this.bank && this.city && this.cardno && this.phone && this.province){
        // this.step = 2;
        this.userService.bindCard(this.token,this.city.id,this.province.id,this.cardno.toString(),this.bank.id.toString(),this.phone.toString()).subscribe(
          (data) => {
            if("bindError" in data){
              this.util.toastShow(data["bindError"]);
            }else if("unsafeCard" in data){
              this.util.toastShow(data["unsafeCard"]);
              this.step = 2;
            }else if("safeCard" in data){
              this.util.toastShow(data["safeCard"]);
              this.dismiss();
            }
          },(err) => {

          }
        );
      }else{
        this.util.toastShow("请提交完整资料");
      }
    }else{
      this.dismiss();
    }
  }

  bindCardServe(){
    if(this.user){
      if(this.token && this.code && this.cardno){
        this.userService.bindCardContinue(this.token,this.code.toString(),this.cardno.toString()).subscribe(
          (data) => {
            console.log(data);
          }
        );
      }
    }else{
      this.dismiss();
    }
  }

  cityChange(city:City){
    this.userService.getCityMap(city.id).subscribe(
      (data) => {
        this.provinces = data;
      });
  }

  //发送验证码 √
  verycodeSend(phone:number){
    if(this.util.veryPhone(phone)) {
      if (this.verycode.veryphone) {
        if (this.verycode.status) {

        } else {
          this.verycode.status = true;
          this.userService.verycodeSend(phone).subscribe(
            (remote) => {
              if ("data" in remote) {
                remote["data"] = JSON.parse(remote["data"]);
                if (remote["data"]["status"] == "true") {
                  this.verycode.send = true;
                  let myInterval = setInterval(() => {
                    if (this.verycode.timers > 1) {
                      this.verycode.timers--;
                    } else {
                      //计时完毕
                      clearInterval(myInterval);
                      this.verycode.timers = 60;
                      this.verycode.status = false;
                    }
                  }, 1000, this.verycode.timers);
                } else {
                  this.util.toastShow("短信发送失败");
                }
              } else {
                this.util.toastShow("短信发送失败");
              }
            },(error) => {

            },() => {

            }
          );
        }
      }
    }else{
      this.util.toastShow("手机号格式错误");
    }
  }

  sendcode(){
    this.verycodeSend(this.phone);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.util.loadingToggle(true);
    this.userService.getBank().subscribe(
      (banks) =>{
        this.banks = banks;
      }
    );
    this.userService.getCity().subscribe(
      (citys) =>{
        this.citys = citys;
        this.util.loadingToggle(false);
      }
    );
  }

}
