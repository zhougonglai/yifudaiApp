import {ToastController, AlertController, LoadingController, Loading} from "ionic-angular";
import {Injectable} from "@angular/core";
import {Keyboard} from "ionic-native";

@Injectable()
export class Utils {
  obj:{};
  loader:Loading = this.loading.create({
    content:"请稍后.."
  });
  constructor(private toast:ToastController,private alertCtrl:AlertController,private loading:LoadingController) {

  }

  public loadingToggle(boolean:boolean){
    boolean?this.loader.present():this.loader.dismiss();
  }

  //验证手机号格式 √ =>true:符合正则
  veryPhone(phone:number):boolean{
    if(!phone){
      return false;
    }else if(phone.toString().match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
      return true;
    }else{
      return false;
    }
  }

  // toast
  public toastShow(message:string,position:string = 'top'){
    let toast = this.toast.create({
      message:message,
      duration:3000,
      position:position,
      showCloseButton: true,
      closeButtonText: '确定'
    });

    toast.present();
  }

  // alert
  public presentAlert(obj:{}){
    this.obj = obj;
    let alert = this.alertCtrl.create(this.obj);
    alert.onDidDismiss(bool =>{
      if(bool){
        Keyboard.close();
      }
    });
    alert.present();
  }
}
