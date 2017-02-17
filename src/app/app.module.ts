import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
// page
import { HomePage } from '../pages/home/home';
import { MapPage } from "../pages/home/map/map";
import { PaperPage} from "../pages/home/paper/paper";

import { InvestPage } from "../pages/invest/invest";
import { AccountPage } from "../pages/account/account";
import { BorrowPage } from "../pages/borrow/borrow";
import { SearchPage } from "../pages/search/search";

import { TabsPage } from '../pages/tabs/tabs';
// component
import { InvestItemComponent } from "../components/invest-item/invest-item";
import { InvestDetailComponent } from "../components/invest-detail/invest-detail";
import { InvesterComponent } from "../components/invester/invester";
import { IonProgressComponent } from "../components/ion-progress/ion-progress";
import { LoginComponent} from "../components/login/login";

//service
import { Storage } from "@ionic/storage";

import { UserData,Utils,UserService } from "../providers";

// pipe
import {Masks} from "../pipes/masks";

import {AccountCardPage} from "../pages/account/account-card/account-card";
import {AddCardPage} from "../pages/account/account-card/add-card/add-card";
import {AcountUserPage} from "../pages/account/acount-user/acount-user";
import {AccountBalancePage} from "../pages/account/account-balance/account-balance";
import {BanlanceDetailPage} from "../pages/account/account-balance/banlance-detail/banlance-detail";
import {AccountInvestPage} from "../pages/account/account-invest/account-invest";
import {UserInvestItemComponent} from "../components/user-invest-item/user-invest-item";
import {UserInvestDetailPage} from "../components/user-invest-item/user-invest-detail/user-invest-detail";
import {AutoInvestPage} from "../pages/account/auto-invest/auto-invest";
import {BorrowStepPage} from "../pages/borrow/borrow-step/borrow-step";
import {IndustryTrendsPage} from "../pages/search/industry-trends/industry-trends";
import {CompanyNewsPage} from "../pages/search/company-news/company-news";
import {MediaNiewPage} from "../pages/search/media-niew/media-niew";
import {AccountEarningsPage} from "../pages/account/account-earnings/account-earnings";


import "chart.js";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {AccountInvitePage} from "../pages/account/account-invite/account-invite";
import {BackendComponent} from "../components/backend/backend";
import {AppLoadingComponent} from "../components/app-loading/app-loading";
import {SaveTyPage} from "../pages/home/save-ty/save-ty";
import {InveterPage} from "../pages/home/inveter/inveter";
import {NewAutoInvestPage} from "../pages/account/auto-invest/new-auto-invest/new-auto-invest";




@NgModule({
  declarations: [
    // page
    MyApp,
    HomePage,
    PaperPage,
    MapPage,
    InvestPage,
    AccountPage,
    BorrowPage,
    SearchPage,
    TabsPage,

    //Component
    InvestItemComponent,
    InvestDetailComponent,
    InvesterComponent,
    IonProgressComponent,
    LoginComponent,
    AppLoadingComponent,
    AccountCardPage,
    AcountUserPage,
    AccountBalancePage,
    AddCardPage,
    AccountInvestPage,
    AccountInvitePage,
    AccountEarningsPage,
    BanlanceDetailPage,
    UserInvestItemComponent,
    UserInvestDetailPage,
    AutoInvestPage,
    BorrowStepPage,
    CompanyNewsPage,
    IndustryTrendsPage,
    MediaNiewPage,
    BackendComponent,
    SaveTyPage,
    InveterPage,
    NewAutoInvestPage,

    Masks
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      platforms:{
        ios:{
          backButtonText:"返回"
        }
      }
    }),FormsModule,ChartsModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    HomePage,
    PaperPage,
    MapPage,
    InvestPage,
    AccountPage,
    BorrowPage,
    SearchPage,
    TabsPage,

    InvestItemComponent,
    InvestDetailComponent,
    InvesterComponent,
    IonProgressComponent,
    LoginComponent,
    AppLoadingComponent,
    AccountCardPage,
    AcountUserPage,
    AccountBalancePage,
    AddCardPage,
    AccountInvestPage,
    AccountInvitePage,
    AutoInvestPage,
    AccountEarningsPage,
    BanlanceDetailPage,
    BorrowStepPage,
    CompanyNewsPage,
    UserInvestItemComponent,
    UserInvestDetailPage,
    MediaNiewPage,
    IndustryTrendsPage,
    SaveTyPage,
    InveterPage,
    NewAutoInvestPage,

    BackendComponent

  ],
  providers: [ Storage, UserData,Utils,UserService]
})
export class AppModule {}
