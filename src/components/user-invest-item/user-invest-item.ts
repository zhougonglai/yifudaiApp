import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInvestDetailPage} from "./user-invest-detail/user-invest-detail";
import { UserInvest} from "../../providers/model";

@Component({
  selector: 'user-invest-item',
  templateUrl: 'user-invest-item.html'
})
export class UserInvestItemComponent {
  @Input()
  userInvest:[ UserInvest ];



  constructor(public navCtrl: NavController) {
  }

  openDetail(invest:UserInvest){
    this.navCtrl.push(UserInvestDetailPage,{invest:invest});
  }

}
