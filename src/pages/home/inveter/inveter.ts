import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-inveter',
  templateUrl: 'inveter.html'
})
export class InveterPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello InveterPage Page');
  }

}
