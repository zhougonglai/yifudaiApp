import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Keyboard } from "ionic-native";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";

import { Events,AlertController,ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { User } from "../model";



@Injectable()
export class UserData {
  user:User;
  HAS_LOGGED_IN = "hasLoggedIn";
  PRIVACY = "privacy";

  constructor(public events:Events,public http: Http,public storage:Storage,private alertCtrl:AlertController,private toast:ToastController) {

  }

  setPrivacy(bool:boolean){
    this.storage.set(this.PRIVACY,bool);
    this.events.publish("togglePrivacy",bool);
  }

  presentAlert(obj:{}){
    let alert = this.alertCtrl.create(obj);
    alert.present();
  }

  //用户隐私
  privacyStatus(){
    return this.storage.get(this.PRIVACY);
  }

  //登录
  login(){
    let prompt = this.alertCtrl.create({
      title:"登录",
      inputs:[
        {
          name:"phone",
          placeholder:"手机号",
          type:"tel"
        },
        {
          name:"pswd",
          placeholder:"密码",
          type:"password"
        }
      ],
      buttons:[
        {
          text:"取消",
          role:"cancel",
          handler:data => {
          }
        },
        {
          text:"登录",
          handler:data => {
            this.loginWithForm(data.phone,data.pswd);
          }
        }
      ]
    });
    prompt.onDidDismiss(bool =>{
      if(bool){
        Keyboard.close();
      }
    });
    prompt.present();
  }

  toastShow(message:string,position:string = 'top'){
    let toast = this.toast.create({
      message:message,
      duration:3000,
      position:position,
      showCloseButton: true,
      closeButtonText: '确定'
    });

    toast.present();
  }

  loginWithForm(phone,pswd){
    this.getUser().then(user => {
      if (user.phone == phone && user.password == pswd) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.events.publish("user:login", user);
      } else {
        this.storage.set(this.HAS_LOGGED_IN, false);
        this.events.publish("user:logError", "账号或密码错误");
      }
    });
  }

  getStatus(){
    return this.storage.get(this.HAS_LOGGED_IN);
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title:"安全退出?",
      message:"点击确认,退出用户.",
      buttons:[
        {
          text:"取消",
          handler:()=>{

          }
        },
        {
          text:"确定",
          handler:()=>{
            this.storage.remove(this.HAS_LOGGED_IN);
            this.events.publish("user:logout");
          }
        }
      ]
    });
    confirm.present();
  }

  setUsername(username:string){
    this.storage.get("user").then((user)=>{
      user.name = username;
      this.storage.set("user",user);
    });
  }

  getLocalUser():User{
    return this.user;
  }

  getRemoteUser():Promise<User>{
    return this.http.get("assets/data/user.json")
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getUserData():any{
    return this.http.get("assets/data/user.json")
      .map(res => res.json());
  }

  getUser():Promise<User>{
    return new Promise(resolve =>{
      this.http.get("assets/data/user.json")
        .map(res => res.json())
        .subscribe(
          user =>{this.user = <User>user;resolve(this.getLocalUser());},
          error => { Promise.reject(error);}
      );
    });
  }

  private handleError(error:any):Promise<any>{
    return Promise.reject(error.message || error);
  }

  updateUser(user:User){
    this.storage.set("user",user);
  }
}
