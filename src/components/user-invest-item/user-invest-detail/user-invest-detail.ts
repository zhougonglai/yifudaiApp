import {Component, ViewChild} from '@angular/core';
import {NavParams, Slides} from 'ionic-angular';
import { UserInvest,InvestItem } from "../../../model";

@Component({
  selector: 'page-user-invest-detail',
  templateUrl: 'user-invest-detail.html'
})
export class UserInvestDetailPage {
  invest:UserInvest;
  investItem:InvestItem;
  slides:{};

  @ViewChild('mySlider') slider: Slides;

  list:boolean[];

  constructor(public navParams:NavParams) {
    this.invest = navParams.get("invest");
    this.slides = {
      pager:true
    };

    this.list = this.invest.investList.map(function (key) {
      return key.isDone;
    });
  }

  ionViewDidLoad() {
    console.log(this.invest);
  }

  ionViewDidEnter(){
    setTimeout(this.slider.slideTo(this.list.indexOf(false),1500),500);
  }

}
