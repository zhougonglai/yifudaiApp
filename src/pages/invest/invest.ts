import { Component,ViewChild } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';
import { Invest} from "../../providers/model";

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
  }

  ionViewDidLoad() {
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
