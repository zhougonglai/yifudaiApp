import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  image:string;
  constructor(public navCtrl: NavController) {
    this.image = "./assets/imgs/new.png";
  }

  ionViewDidLoad() {

  }

}
