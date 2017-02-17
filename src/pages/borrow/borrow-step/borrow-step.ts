import { Component } from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {UserService,Utils} from "../../../providers";


@Component({
  selector: 'page-borrow-step',
  templateUrl: 'borrow-step.html'
})
export class BorrowStepPage {
  dates:[{}] =[{}];
  date:number;
  types:[{}] = [{}];
  type:number;
  id:number;
  token:string;
  model:{money:number,date:number,type:number} = {money:null,date:null,type:null};
  // 验证码模型;
  verycode:{status:boolean,text:string,timers:number,send:boolean,veryphone:boolean} = {status:false,text:"发送验证码",timers:60,send:false,veryphone:false};


  constructor(public navCtrl: NavController,private navParams:NavParams,private userService:UserService,private util:Utils,private event:Events) {
    this.id = navParams.get("id");
    this.token = navParams.get("token");
  }

  ionViewDidLoad() {
    this.userService.borrowTermList().subscribe((result) =>{
      console.log(result);
      this.dates = result["borrowTermList"];
      this.types = result["repaymentTypes"];
    });
  }

  sendForm(model){
    if(this.token){
      if(model.money>=2000 && model.money <= 2000000 && model.money%100 === 0){
        if(model.date && model.type){
          this.util.loadingToggle(true);
          this.userService.borrowRequest(this.token,model.money.toString(),model.date.toString(),model.type.toString())
            .subscribe((result) => {
            this.util.loadingToggle(false);
            if("err" in result){
              this.util.toastShow(result["err"]);
            }else if("success" in result){
              this.util.toastShow(result["success"]);
              this.event.publish("invest:done");
            }
          });
        }else{
          this.util.presentAlert({
            message:"请选择对应的借款期限和还款方式",
            buttons:["确定"]
          });
        }
      }else{
        this.util.presentAlert({
          message:"借款金额在2000-2000000之间且为100整数倍",
          buttons:["确定"]
        });
      }
    }
  }


}
