import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-borrow-step',
  templateUrl: 'borrow-step.html'
})
export class BorrowStepPage {
  step:number = 1;
  dates:number[] = [ 1,2,3,4,5,6,7,8,9,10,11,12,24,36 ];
  date:number;
  types:number[] = [1,2];
  type:number;


  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello BorrowStepPage Page');
  }

  nextStep(){
    this.step++;
  }

}
