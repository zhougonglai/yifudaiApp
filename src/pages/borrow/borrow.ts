import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BorrowStepPage} from "./borrow-step/borrow-step";


@Component({
  selector: 'page-borrow',
  templateUrl: 'borrow.html'
})
export class BorrowPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BorrowPage Page');
  }

  borrowStep(){
    this.navCtrl.push(BorrowStepPage);
  }

}
