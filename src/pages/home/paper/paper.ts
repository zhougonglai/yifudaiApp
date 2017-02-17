import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-paper',
  templateUrl: 'paper.html'
})
export class PaperPage {
  pagers:[
    {
      title:string,
      subtitle:string
      status:boolean,
      img:string,
      date:string
    }
    ];
  constructor(public navCtrl: NavController) {
    this.pagers = [
      {
        title:"积分商城",
        subtitle:"大波好礼来袭,你来不来",
        status:true,
        img:"./assets/imgs/banner/banner_coupon.jpg",
        date:"长期有效"
      },
      {
        title:"注册推荐送礼",
        subtitle:"注册推荐红包送不停",
        status:true,
        img:"./assets/imgs/banner/banner_savety.jpg",
        date:"长期有效"
      },
      {
        title:"圣诞大狂欢",
        subtitle:"投资送大礼",
        status:false,
        img:"./assets/imgs/banner/banner_uplevel.jpg",
        date:"2015.12.20-2016.01.10"
      }
    ];
  }

  ionViewDidLoad() {
  }

}
