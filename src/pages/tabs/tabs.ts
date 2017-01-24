import {Component, ViewChild} from '@angular/core';

import { HomePage } from '../home/home';
// import { InvestPage } from "../invest/invest";
import { AccountPage } from "../account/account";
import { BorrowPage } from "../borrow/borrow";
// import { SearchPage } from "../search/search";
import {Tabs,Events} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  rootPage: [{
    root:any,
    rootParams?:any,
    tabUrlPath?:string,
    title:string,
    icon:string,
    badge?:string,
    badgeStyle?:string,
    enabled?:boolean,
    show?:boolean,
    swipeBackEnabled?:boolean,
    tabsHideOnSubPages?:boolean
  }];

  @ViewChild("tabs") tabs:Tabs;

  constructor(private event:Events) {
    // {
    //   root:InvestPage,
    //     title:"投资",
    //   icon:"stats"
    // },

    // {
    //   root:SearchPage,
    //     title:"探索",
    //   icon:"apps"
    // }

    this.rootPage = [
      {
        root:HomePage,
        title:"首页",
        icon:"home"
      },

      {
        root:AccountPage,
        title:"我的",
        icon:"person"
      },
      {
        root:BorrowPage,
        title:"借款",
        icon:"cash"
      }
    ];
    event.subscribe("invest:done",()=>{
      this.tabs.select(2);
    });
  }
}
