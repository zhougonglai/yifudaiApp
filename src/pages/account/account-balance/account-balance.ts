import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BanlanceDetailPage} from "./banlance-detail/banlance-detail";


@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html'
})
export class AccountBalancePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AccountBalancePage Page');
  }

  goToBalanceDetail(){
    this.navCtrl.push(BanlanceDetailPage);
  }
}
