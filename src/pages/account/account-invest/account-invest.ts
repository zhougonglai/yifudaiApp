import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-account-invest',
  templateUrl: 'account-invest.html'
})
export class AccountInvestPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AccountInvestPage Page');
  }

}
