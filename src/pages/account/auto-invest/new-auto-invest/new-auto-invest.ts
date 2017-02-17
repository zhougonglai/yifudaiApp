import { Component } from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {User} from "../../../../providers/model/user";
import {UserData} from "../../../../providers/user-data";


@Component({
  selector: 'page-new-auto-invest',
  templateUrl: 'new-auto-invest.html'
})
export class NewAutoInvestPage {
  dates:[number] = [1,2,3,4,5,6,7,8,9,10,11,12,18,24,36];
  minDate:number = this.dates[0];
  maxDate:number = this.dates[ this.dates.length -1 ];

  levels:[string] = ["C","A","B","AAA"];
  minLevel:string = this.levels[0];
  maxLevel:string = this.levels[ this.levels.length -1 ];
  token:string;
  user:User;

  constructor(public navCtrl: NavController,private userData:UserData,events:Events) {
    userData.getUserFormService(userData.getToken());

    events.subscribe("user:login",([user]) =>{
      this.user = user;
    });
  }

  ionViewDidLoad() {

  }

}
