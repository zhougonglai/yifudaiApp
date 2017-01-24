export class User{
  //充值红包余额
  totalRechargeMoney:number;
  //名字
  username:string;
  //昵称
  nickName:string;
  //账户余额
  money:number;
  //账户总资产
  sumMoney:number;
  //支付密码
  queryIsSetPayPasswordRequest:boolean;
  //已实名
  identityAuthentication:boolean;
  //检查是否开通余额授权
  isAuthorization:boolean;
  //授权明细
  authorizationDetailsLine:[{}];

  coupons:[Coupons];

  bankCard:[BankCard];
}

//投资人的红包列表
export class Coupons{
  id:number;
  type:number;
  money:number;
}

export class BankCard{
  id:number;
  card_id:number;
  maskCardID:string;
  cardno:string;
  is_verified:string;
  ticket:string;
  isSecurityCard:boolean;
  bank:Bank;
}

export class Bank{
  id:number;
  name:string;
  image:string;
  type:number;
  sort:number;
  bindPay:boolean;
  onlinePay:boolean;

  withdrawable:boolean;
  //绑定制服单笔限额
  singleBindPayQuota:number;
  bankcode:string;
  // 绑定支付首笔限额
  firstBindPayQuota:number;
  // 绑定支付每日限额
  dayBindPayQuota:number;
  phone:string;
}

