import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewAutoInvestPage} from "./new-auto-invest/new-auto-invest";
import {UserData} from "../../../providers/user-data";
import {UserService} from "../../../providers/user-service";
import {AutoInvest} from "../../../providers/model/investItem";
import {Utils} from "../../../providers/utils";

@Component({
  selector: 'page-auto-invest',
  templateUrl: 'auto-invest.html'
})
export class AutoInvestPage {
  token:string;
  page:number = 1;
  isDone:boolean = false;
  autoInvests:[AutoInvest];

  constructor(public navCtrl: NavController,private userData:UserData,private userService:UserService,private util:Utils) {
    this.token = this.userData.getToken();
    this.queryAutoInvest(this.page);
  }

  newAutoInvest(){
    this.token = this.userData.getToken();
    if(this.token){
      this.navCtrl.push(NewAutoInvestPage);
    }else{
      this.userData.login();
    }
  }

  queryAutoInvest(page:number){

    this.userService.autoInvest(this.token,page).subscribe((data:[AutoInvest])=>{
      setTimeout(()=> {
        this.isDone = true;
        if(data.length>0){
          if (page == 1) {
            this.autoInvests = data;
          } else {
            for (let i = 0;i<data.length;i++){
              this.autoInvests.push(data[i]);
            }
          }
        }else{

        }
        console.log(this.autoInvests);
      },1000);
    });
  }

  deleteAutoAmount(id){
    this.util.loadingToggle(true);
    this.userService.deleteAutoMatic(id).subscribe((data)=>{
      this.util.toastShow("删除成功");
      setTimeout(()=>{
        this.page = 1;
        this.queryAutoInvest(this.page);
        this.util.loadingToggle(false);
      },600);
    });
  }

  doInfinite(infiniteScroll){
    this.userService.autoInvest(this.token,++this.page).subscribe((data:[AutoInvest])=>{
      this.isDone = true;
      if(data.length == 5){
        for (let i = 0;i<data.length;i++){
          this.autoInvests.push(data[i]);
        }
      }else{
        infiniteScroll.enable(false);
      }
    });
    setTimeout(() => {
      infiniteScroll.complete();
    },2000);
  }

  ionViewDidLoad() {

  }

}
