import { Component } from '@angular/core';
import {ViewController, ActionSheetController, ModalController} from 'ionic-angular';
import {AddCardPage} from "./add-card/add-card";


@Component({
  selector: 'page-account-card',
  templateUrl: 'account-card.html'
})
export class AccountCardPage {

  constructor(public viewCtrl:ViewController,public actionSheet:ActionSheetController,public modalCtrl:ModalController) {}

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
    let addCardPage = this.modalCtrl.create(AddCardPage);
    addCardPage.present();
  }

}
