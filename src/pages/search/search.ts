import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IndustryTrendsPage} from "./industry-trends/industry-trends";
import {CompanyNewsPage} from "./company-news/company-news";
import {MediaNiewPage} from "./media-niew/media-niew";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  goToIndustryTrendsPage(){
    this.navCtrl.push(IndustryTrendsPage);
  }

  goToCompanyNewsPage(){
    this.navCtrl.push(CompanyNewsPage);
  }

  goToMediaNiewPage(){
    this.navCtrl.push(MediaNiewPage);
  }
}
