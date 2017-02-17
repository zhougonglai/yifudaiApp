import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BanlanceDetailPage} from "./banlance-detail/banlance-detail";


@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html'
})
export class AccountBalancePage {
  balance:number;

  constructor(public navCtrl: NavController,private navParams:NavParams) {
    this.balance = navParams.get("balance");
    console.log(this.balance);
  }

  ionViewDidLoad() {
  }

  goToBalanceDetail(){
    this.navCtrl.push(BanlanceDetailPage);
  }
}
