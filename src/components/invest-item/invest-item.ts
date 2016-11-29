import { Component,Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Invest } from "../../model";

import { InvestDetailComponent } from "../invest-detail/invest-detail";


@Component({
  selector: 'invest-item',
  templateUrl: 'invest-item.html'
})
export class InvestItemComponent {

  text: string;
  @Input()
  invests:[Invest];
  invest:Invest;

  constructor(public nav:NavController) {

  }

  goToDetail(invest:Invest){
        this.nav.push(InvestDetailComponent,{
          invest:invest
        });
  }
}
