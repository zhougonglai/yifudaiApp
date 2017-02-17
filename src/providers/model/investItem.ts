export class InvestItem{
  user:string;
  time:string;
  doneTime:string;
  money:number;
  rate:number;
  rateMoney:number;
  isDone:boolean;
  note:string;
}

export class AutoInvest{
  id:number;
  //投资金额
  amount:number;
  //账户保留金额
  account:number;

  auopen:string;
  //利率范围
  interestrangeone:number;
  interestrangetwo:number;
  //借款期限
  loantermone:number;
  loantermtwo:number;
  //信用等级
  creditratingone:string;
  creditratingtwo:string;
}
