import { Component,ViewChild } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';
import { Invest} from "../../model";

@Component({
  selector: 'page-invest',
  templateUrl: 'invest.html'
})
export class InvestPage {
  investTypes:[string] = ['all',"sanbiao",'xiaofei','zhaiquan'];
  invest:string = this.investTypes[0];
  allInvest:[Invest];
  sanbiaoInvest:[Invest];
  xiaofeiInvest:[Invest];
  zhaiquanInvest:[Invest];
  @ViewChild("sliderDetail") slider:Slides;

  constructor(public navCtrl: NavController) {
    this.invest = "all";
    this.allInvest = [
        {
          title:"电子商务公司资金周转",
          mark:"1",
          money:100000000,
          level:"AA",
          rate:9.3,
          date:12,
          existed:2000
        },
        {
          title:"个人欧洲10国旅游分期",
          mark:"2",
          money:40000000,
          level:"BBB",
          rate:9.2,
          date:12,
          existed:21000
        },
        {
          title:"电子商务公司资金周转",
          mark:"3",
          money:2000000,
          level:"BB",
          rate:9.6,
          date:12,
          existed:56000
        }
    ];
    this.sanbiaoInvest = [
      {
        title:"个人法国10日旅游分期",
        mark:"5",
        money:40000,
        level:"A",
        rate:9.2,
        date:12,
        existed:21000
      }
    ];
    this.xiaofeiInvest = [
      {
        title:"双十一购物分期",
        mark:"4",
        money:20000,
        level:"C",
        rate:9.6,
        date:12,
        existed:56000
      }
    ];
    this.zhaiquanInvest = [
      {
        title:"债券转让",
        mark:"2",
        money:20000,
        level:"AAA",
        rate:9.6,
        date:12,
        existed:5600
      }
    ];

  }

  ionViewDidLoad() {
    console.log('Hello InvestPage Page');
  }

  goToDetail(invest){
    let index = this.investTypes.indexOf(invest);
    this.slider.slideTo(index);
  }

  onSlideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    this.invest = this.investTypes[currentIndex];
  }

}
