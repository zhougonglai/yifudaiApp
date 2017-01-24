import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";

import { UserService } from "./user-service";
import { Utils } from "./utils";

import {Events, LoadingController} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { User } from "./model";
import {Injectable} from "@angular/core";

@Injectable()
export class UserData {
  user:User;
  HAS_LOGGED_IN = "hasLoggedIn";
  PRIVACY = "privacy";
  private token:string;


  constructor(public events:Events,public userService:UserService ,public utils:Utils,public storage:Storage,public loading:LoadingController) {

  }

  //用户隐私 √
  setPrivacy(bool:boolean){
    this.storage.set(this.PRIVACY,bool);
    this.events.publish("togglePrivacy",bool);
  }

  //用户隐私 √
  privacyStatus(){
    return this.storage.get(this.PRIVACY);

  }

  // 获取口令 √
  getToken():string{
    return this.token;
  }


  //登录页面(loginPage) 登录 √
  loginWithOutPop(phone:string,password:string){
    let loader = this.loading.create({
      content:"请稍后.."
    });
    loader.present();
    this.userService.getUsers(phone,password).subscribe(
      (remote) => {
        loader.dismiss();
        if("message" in remote){
          if(remote["message"] == "SUCCESS"){
            if("data" in remote){
              remote["data"] = JSON.parse(remote["data"]);
              this.token = remote["data"]["token"];
              this.getUserFormService(this.token);
            }
          }else{
            this.utils.toastShow(remote["message"]);
          }
        }
      },(err) => {

      },() => {

      }
    )
  }

  getUserFormService(token:string){
    this.userService.getUserRemote(token).subscribe(
      (remote) =>{
        if("message" in remote){
          if(remote["message"] == "SUCCESS"){
            this.saveUser(<User>JSON.parse(remote["data"]));
          }else{
            this.events.publish("user:err");
            this.utils.toastShow(remote["message"]);
          }
        }
      },
      (err) => {}
    );
  }

  //保存用户 √
  saveUser(user:User){
    this.user = user;
    this.storage.set("user",this.user);
    this.storage.set(this.HAS_LOGGED_IN,true);
    this.events.publish("user:login",this.user);
  }

  //登录
  login(){
    this.utils.presentAlert({
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
            this.loginWithOutPop(data.phone,data.pswd);
          }
        }
      ]
    });
  }

  // 检查用户是否有可投资权限
  checkUserInvestPermission(user:User):boolean{
    return (user.queryIsSetPayPasswordRequest&&user.identityAuthentication&&user.isAuthorization);
  }

  // 获取 用户登录状态
  getStatus(){
    return this.storage.get(this.HAS_LOGGED_IN);
  }

  // 退出
  logout(){
    this.utils.presentAlert({
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
  }

  // 获取用户数据缓存
  getLocalUser():User{
    return this.user;
  }

  // 从缓存取 User
  getUserData(){
    return this.storage.get("user");
  }

  // 更新缓存用户
  updateStoreUser(user:User){
    this.storage.set("user",user);
  }
}
