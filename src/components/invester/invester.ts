import { Component } from '@angular/core';

import { ViewController,AlertController } from "ionic-angular";

@Component({
  selector: 'invester',
  templateUrl: 'invester.html'
})
export class InvesterComponent {

  toppings:any;
  selectOptions:{};

  constructor(public viewCtrl:ViewController,public alertCtrl:AlertController) {
    this.selectOptions = {
      title:"所有红包"
    };
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  showCheckBox(){
    let alert = this.alertCtrl.create({
      title:"所有红包",
      inputs:[
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"1",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"2",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"3",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"4",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"5",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"6",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"7",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"8",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"9",
          checked:false
        },
        {
          type:"checkbox",
          label:"100元充值红包",
          value:"10",
          checked:false
        }
      ],
      buttons:[
        {
          text:"取消",
          role:"Cancel"
        },
        {
          text:"确定",
          handler:data =>{
            console.log("checkbox data:",data);
          }
        }
      ]
    });
    alert.present();


  }

}
