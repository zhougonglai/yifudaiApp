import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { InvestPage } from "../invest/invest";
import { AccountPage } from "../account/account";
import { BorrowPage } from "../borrow/borrow";
import { SearchPage } from "../search/search";

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

  constructor() {
    this.rootPage = [
      {
        root:HomePage,
        title:"首页",
        icon:"home"
      },
      {
        root:InvestPage,
        title:"投资",
        icon:"stats"
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
      },
      {
        root:SearchPage,
        title:"探索",
        icon:"apps"
      }
    ];

  }
}
