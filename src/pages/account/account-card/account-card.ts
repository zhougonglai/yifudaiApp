import { Component } from '@angular/core';
import {ViewController, ActionSheetController, ModalController, Events} from 'ionic-angular';
import {AddCardPage} from "./add-card/add-card";
import {User} from "../../../providers/model/user";
import {UserData} from "../../../providers/user-data";


@Component({
  selector: 'page-account-card',
  templateUrl: 'account-card.html'
})
export class AccountCardPage {
  token:string;
  user:User;

  constructor(public viewCtrl:ViewController,public actionSheet:ActionSheetController,public modalCtrl:ModalController,public userData:UserData,private events:Events) {
    this.userData.getUserData().then(user =>{
      this.user = user;
      console.log(user);
    });
  }

  presentActionSheet(){
    let actionSheet = this.actionSheet.create({
      buttons:[
        {
          text:"解绑银行卡",
          role:"destructive",
          handler:() =>{
            console.log('Destructive clicked');
          }
        },
        {
          text:"取消",
          role:"cancel",
          handler:() =>{
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  ionViewDidLoad() {

  }

  // dismiss(){
  //   this.viewCtrl.dismiss();
  // }

  addCard(){
    this.token = this.userData.getToken();
    if(this.token){
      let addCardPage = this.modalCtrl.create(AddCardPage,{token:this.token});
      addCardPage.present();
    }else{
      this.userData.login();
    }
  }

}
