import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInvestDetailPage} from "./user-invest-detail/user-invest-detail";
import { UserInvest} from "../../providers/model";

@Component({
  selector: 'user-invest-item',
  templateUrl: 'user-invest-item.html'
})
export class UserInvestItemComponent {
  userInvest:[ UserInvest ];

  constructor(public navCtrl: NavController) {
    this.userInvest = [
      {
        title:"电子商务公司资金周转",
        isDone:false,
        money:100000,
        coupon:0,
        rate:10.2,
        earnings:100.1,
        recent:"2016-11-16",
        investList:[
          {user:"孙焕妮",time:"2016-08-29",doneTime:"2016-08-29",money:0.0,rate:9.35,rateMoney:9.35,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-09-29",doneTime:"2016-09-29",money:0.0,rate:9.35,rateMoney:9.35,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-29",doneTime:"2016-10-29",money:0.0,rate:9.35,rateMoney:9.35,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-11-29",doneTime:null,money:0.0,rate:9.35,rateMoney:9.35,isDone:false,note:null},
          {user:"孙焕妮",time:"2016-12-29",doneTime:null,money:0.0,rate:9.35,rateMoney:9.35,isDone:false,note:null},
          {user:"孙焕妮",time:"2017-01-29",doneTime:null,money:1100.0,rate:9.35,rateMoney:1109.35,isDone:false,note:null}
          ]
      },
      {
        title:"个人欧洲10国旅游分期",
        isDone:false,
        money:10000,
        coupon:10,
        rate:9.3,
        earnings:23.3,
        recent:"2016-12-22",
        investList:[
          {user:"孙焕妮",time:"2016-01-29",doneTime:"2016-01-29",money:0.0,rate:9.5,rateMoney:9.5,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-02-29",doneTime:"2016-02-29",money:0.0,rate:9.5,rateMoney:9.5,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-03-29",doneTime:"2016-03-29",money:0.0,rate:9.5,rateMoney:9.5,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-04-29",doneTime:"2016-04-29",money:0.0,rate:9.5,rateMoney:9.5,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-05-29",doneTime:"2016-05-29",money:0.0,rate:9.5,rateMoney:9.5,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-06-29",doneTime:null,money:0.0,rate:9.5,rateMoney:9.5,isDone:false,note:null},
          {user:"孙焕妮",time:"2016-07-29",doneTime:null,money:0.0,rate:9.5,rateMoney:9.5,isDone:false,note:null},
          {user:"孙焕妮",time:"2016-08-29",doneTime:null,money:0.0,rate:9.5,rateMoney:9.5,isDone:false,note:null},
          {user:"孙焕妮",time:"2016-09-29",doneTime:null,money:1000.0,rate:9.5,rateMoney:1009.5,isDone:false,note:null}
        ]
      },
      {
        title:"双十一购物分期",
        isDone:true,
        money:5000,
        coupon:100,
        rate:11.11,
        earnings:555.5,
        recent:"2016-11-11",
        investList:[
          {user:"孙焕妮",time:"2016-08-08",doneTime:"2016-08-08",money:0.0,   rate:54.25,rateMoney:54.25,  isDone:true,note:null},
          {user:"孙焕妮",time:"2016-09-08",doneTime:"2016-09-08",money:0.0,   rate:54.25,rateMoney:54.25,  isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-08-08",doneTime:"2016-08-08",money:0.0,   rate:54.25,rateMoney:54.25,  isDone:true,note:null},
          {user:"孙焕妮",time:"2016-09-08",doneTime:"2016-09-08",money:0.0,   rate:54.25,rateMoney:54.25,  isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null},
          {user:"孙焕妮",time:"2016-10-08",doneTime:"2016-10-08",money:7000.0,rate:54.25,rateMoney:7054.25,isDone:true,note:null}
        ]
      }
    ];
  }

  openDetail(invest:UserInvest){
    this.navCtrl.push(UserInvestDetailPage,{invest:invest});
  }

}
