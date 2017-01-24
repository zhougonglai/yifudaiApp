import {InvestItem} from "./investItem";

export class UserInvest{
  title:string;
  isDone:boolean;
  money:number;
  coupon:number;
  rate:number;
  earnings:number;
  recent:string;
  investList:[InvestItem];
}
