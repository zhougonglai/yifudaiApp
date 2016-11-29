import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html'
})
export class AddCardPage {
  banks:string;
  citys:string;
  step:number = 1;

  constructor(public viewCtrl: ViewController) {}

  nextStep(){
    this.step = 2;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello AddCardPage Page');
  }

}
