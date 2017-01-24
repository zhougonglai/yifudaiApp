import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";


@Component({
  selector: 'backend',
  templateUrl: 'backend.html'
})
export class BackendComponent {

  title: string;
  public typeList = [
    {
      title:"按月等额本息还款",
      note:"本金 + 利息 / 投资周期",
      open:false
    },
    {
      title:"按月付息,到期还本",
      note:"利息 / 投资周期,最后一期还本金, 利息略高于'按月等额本息还款'.",
      open:false
    }
  ];

  constructor(public viewCtrl:ViewController) {
    this.title = "还款方式";
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  toggle(type){
    type.open = !type.open;
  }
}
