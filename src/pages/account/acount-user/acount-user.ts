import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-acount-user',
  templateUrl: 'acount-user.html'
})
export class AcountUserPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AcountUserPage Page');
  }

}
