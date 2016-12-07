import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-auto-invest',
  templateUrl: 'auto-invest.html'
})
export class AutoInvestPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AutoInvestPage Page');
  }

}
