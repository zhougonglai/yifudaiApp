import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-save-ty',
  templateUrl: 'save-ty.html'
})
export class SaveTyPage {
  image:string = './assets/imgs/savety.jpg';

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {

  }

}
