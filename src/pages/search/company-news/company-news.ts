import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-company-news',
  templateUrl: 'company-news.html'
})
export class CompanyNewsPage {
  list:{}[];
  constructor(public navCtrl: NavController) {
    this.list = [
      {
        type:1,
        img:"http://www.gbtags.com/gb/laitu/100x100",
        title:"互金协会举报信息平台将上线,威慑'害群之马'",
        note:"据悉,中国互联网金融协会(下称'互金协会')在8月20日召开互联网金融举报信息平台开通准备培训会,邀请人民....",
        date:"2015-08-22"
      },
      {
        type:1,
        img:"http://www.gbtags.com/gb/laitu/100x100",
        title:"理财纠纷不断,南京银行违规",
        note:"曾经因违规销售基金产品被江苏证监局责令整改的南京银行,仍拒绝对投资者进行赔偿.",
        date:"2015-08-22"
      },
      {
        type:2,
        title:"11起P2P借款人违约案：'老赖'们无一胜诉",
        note:"据中国裁判文书网所披露,半年多以来,多起P2P平台'老赖'案件得以审结。欣慰的是，'老赖'们无一胜诉",
        date:"2015-08-22"
      },
      {
        type:2,
        title:"11起P2P借款人违约案：'老赖'们无一胜诉",
        note:"据中国裁判文书网所披露,半年多以来,多起P2P平台'老赖'案件得以审结。欣慰的是，'老赖'们无一胜诉",
        date:"2015-08-22"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello CompanyNewsPage Page');
  }

}
