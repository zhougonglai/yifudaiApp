import {Component, ViewChild} from '@angular/core';
import {ViewController, Slides, Events} from "ionic-angular";

import { UserService,Utils,UserData} from "../../providers";
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  types:[string] = ["登录","注册"];
  type:string = this.types[0];
  @ViewChild("sliderDetail") slider:Slides;
  // 登录模型;
  model:{phone:number,pswd:string} = {phone:null,pswd:null};
  // 注册模型;  recommendPhone 推荐人
  sign:{phone:number,recommendPhone?:number,pswd:string,code:number} = {phone:null,pswd:null,code:null};
  // 验证码模型;
  verycode:{status:boolean,text:string,timers:number,send:boolean,veryphone:boolean} = {status:false,text:"发送验证码",timers:60,send:false,veryphone:false};



  constructor(public viewCtrl:ViewController,public userService:UserService,public userData:UserData,public events:Events,public util:Utils) {
    this.events.subscribe("user:login",()=>{
      this.dismiss();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  //切换登录注册 √
  onSlideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    this.type = this.types[currentIndex];
  }

  //发送验证码 √
  verycodeSend(phone:number){
    if(this.veryPhone(phone)) {
      if (this.verycode.veryphone) {
        if (this.verycode.status) {

        } else {
          this.verycode.status = true;
          this.userService.verycodeSend(phone).subscribe(
            (remote) => {
              if ("data" in remote) {
                remote["data"] = JSON.parse(remote["data"]);
                if (remote["data"]["status"] == "true") {
                  this.verycode.send = true;
                  let myInterval = setInterval(() => {
                    if (this.verycode.timers > 1) {
                      this.verycode.timers--;
                    } else {
                      //计时完毕
                      clearInterval(myInterval);
                      this.verycode.timers = 60;
                      this.verycode.status = false;
                    }
                  }, 1000, this.verycode.timers);
                } else {
                  this.util.toastShow("短信发送失败");
                }
              } else {
                this.util.toastShow("短信发送失败");
              }
            },(error) => {

            },() => {

            }
          );
        }
      } else if (!this.verycode.veryphone) {
        this.userService.verycodeCheck(this.sign.phone)
          .subscribe(
            (remote) => {
              if ("data" in remote) {
                remote["data"] = JSON.parse(remote["data"]);
                console.log(remote);
                if (remote["data"]["status"] == "true") {// 可以注册
                  this.verycode.veryphone = true;
                  this.verycodeSend(this.sign.phone);
                } else if (remote["data"]["status"] == "false") {// bu可以注册,手机号已经注册过
                  this.util.toastShow("手机号已经注册过");
                }
              }
            }, (err) => {

            });
      }
    }else{
        this.util.toastShow("手机号格式错误");
    }
  }

  goToDetail(type){
    switch (type){
      case this.types[0]:
        this.slider.slideTo(1);
        break;
      case this.types[1]:
        this.slider.slideTo(0);
        break;
    }
  }

  //登录 √
  onSubmit(){
    this.userData.loginWithOutPop(this.model.phone.toString(),this.model.pswd);
  }


  //验证手机号格式 √ =>true:符合正则,=>false:@
  veryPhone(phone:number):boolean{
    if(!phone){
      return false;
    }else if(phone.toString().match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
      return true;
    }else{
      return false;
    }
  }

  //验证码 √
  veryCode(code:number):boolean{
    if(!code){
      return false;
    }else if(code.toString().length == 6){
      return true;
    }else{
      return false;
    }
  }

  //验证密码 √
  veryPassword(password:string):boolean{
    const pattern = "([ `~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？])|(^[a-zA-Z0-9-]+$)";
    if(!password){
      return false;
    }else if(this.sign.pswd.match(pattern)){
      if(this.sign.pswd.match(/^\S+$/)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  //注册 √
  onSignUp(){
    if(this.veryPhone(this.sign.phone)){
      if(this.veryCode(this.sign.code)){
        if(this.veryPassword(this.sign.pswd)){
          if(this.sign.recommendPhone){
            // 填写了推荐人
            if(this.veryPhone(this.sign.recommendPhone)){
              this.userService.verycodeCheck(this.sign.recommendPhone)
                .subscribe(
                  (remote) => {
                    if ("data" in remote) {
                      remote["data"] = JSON.parse(remote["data"]);
                      if (remote["data"]["status"] == "true") {// 可以注册
                        this.util.toastShow("推荐人手机号不存在");
                      } else if (remote["data"]["status"] == "false") {// bu可以注册,手机号已经注册过
                        this.userService.registe(this.sign.phone,this.sign.code,this.sign.pswd,this.sign.recommendPhone)
                          .subscribe(
                            (remote) => {
                              if("data" in remote){
                                remote["data"] = JSON.parse(remote["data"]);
                                if (remote["data"]["status"] == "success") {// 注册成功
                                  this.userData.loginWithOutPop(this.sign.phone.toString(),this.sign.pswd);
                                } else if (remote["data"]["status"] == "error") {// 注册错误

                                }
                                this.util.toastShow(remote["data"]["message"]);
                              }
                            },(err) => {

                            },() =>{

                            }
                          );
                      }
                    }
                  }, (err) => {

                  });
            }else{
              this.util.toastShow("推荐人手机号格式错误");
            }
          }else{ // wei 填写了推荐人
            this.userService.registe(this.sign.phone,this.sign.code,this.sign.pswd)
              .subscribe(
                (remote) => {
                  if("data" in remote){
                    remote["data"] = JSON.parse(remote["data"]);
                    if (remote["data"]["status"] == "success") {// 注册成功
                      this.userData.loginWithOutPop(this.sign.phone.toString(),this.sign.pswd);
                    } else if (remote["data"]["status"] == "error") {// 注册错误

                    }
                    this.util.toastShow(remote["data"]["message"]);
                  }
                },(err) => {

                },() =>{

                }
              );
          }
        }else{
          this.util.toastShow("密码格式错误");
        }
      }else{
        this.util.toastShow("验证码格式错误");
      }
    }else{
      this.util.toastShow("手机号格式错误");
    }
  }

  forgetPswd(){
    console.log("forgetPassword!");
  }
}
