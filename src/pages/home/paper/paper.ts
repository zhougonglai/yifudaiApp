import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Paper page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paper',
  templateUrl: 'paper.html'
})
export class PaperPage {
  pagers:[{title:string,status:boolean}];
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello PaperPage Page');
  }

}
