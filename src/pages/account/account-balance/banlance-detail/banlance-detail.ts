import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-banlance-detail',
  templateUrl: 'banlance-detail.html'
})
export class BanlanceDetailPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BanlanceDetailPage Page');
  }

}
