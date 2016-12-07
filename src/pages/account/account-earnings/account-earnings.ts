import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Directive,ElementRef,Renderer

@Component({
  selector: 'page-account-earnings',
  templateUrl: 'account-earnings.html'
})
export class AccountEarningsPage {
  public doughnutChartLabels:string[] = ["存钱罐","定期理财收益","债权转让收益","红包收益"];
  public doughnutChartData = [21.4,1782.5,51.2,41.5];
  public doughnutChartType:string = 'pie';

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad(){

  }

}
