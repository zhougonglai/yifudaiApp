import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Borrow page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-borrow',
  templateUrl: 'borrow.html'
})
export class BorrowPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BorrowPage Page');
  }

}
