import {Component, ViewChild} from '@angular/core';
import {ViewController, Slides, Events} from "ionic-angular";

import { UserData} from "../../providers/user-data";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  types:[string] = ["登录","注册"];
  type:string = this.types[0];
  @ViewChild("sliderDetail") slider:Slides;
  model:{phone:number,pswd:string} = {phone:null,pswd:null};
  sign:{phone:number,pswd:string,code:number} = {phone:null,pswd:null,code:null};

  constructor(public viewCtrl:ViewController,public userData:UserData,public events:Events) {
    this.events.subscribe("user:login",()=>{
      this.dismiss();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSlideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    this.type = this.types[currentIndex];
  }

  goToDetail(type){
    let index =  this.types.indexOf(type);
    this.slider.slideTo(index);
  }

  onSubmit(){
    console.log(this.model);
    this.userData.loginWithForm(this.model.phone,this.model.pswd);
  }
  onSignUp(){
    console.log(this.sign);

  }

  forgetPswd(){
    console.log("forgetPassword!");
  }
}
