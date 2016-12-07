import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-account-invite',
  templateUrl: 'account-invite.html'
})
export class AccountInvitePage {

  constructor(public navCtrl: NavController) {

  }

  public openPhone(){
    window.open("tel:15271871141","_system");
  }

  public mailTo(){
    window.open("mailto:838048635@qq.com","_system");
  }

  public smsTo(){
    window.open("sms:15271871141","_system");
  }



  ionViewDidLoad() {
    console.log('Hello AccountInvitePage Page');
  }

}
