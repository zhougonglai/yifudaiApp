import {Component, ViewChild} from '@angular/core';
import {NavParams, Slides} from 'ionic-angular';
import { UserInvest,InvestItem } from "../../../providers/model";

@Component({
  selector: 'page-user-invest-detail',
  templateUrl: 'user-invest-detail.html'
})
export class UserInvestDetailPage {
  invest:UserInvest;
  investItem:InvestItem;
  slides:{};
  active:number = 0;

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

  getActive(index){
    this.active = index;
    this.slider.slideTo(this.active,1500);
  }

  ionViewDidLoad() {
    console.log(this.invest);
  }

  ionViewDidEnter(){
    this.active = this.list.indexOf(false);
    setTimeout(this.slider.slideTo(this.active,1500),500);
  }
  onSlideChanged(){
    this.active = this.slider.getActiveIndex();
  }

}
