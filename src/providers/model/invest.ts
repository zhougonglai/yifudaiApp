export class Invest{
  //id
  id:number;
  // 标题
  title:string;
  // 借款金额
  borrowMoney:number;
  // 年利率
  profitRate:number;
  // 评级
  level:string;
  // 借款编号
  contract_No:string;
  // 借款类型
  borrowType:string;
  // 借款描述
  description:string;
  //还款类型
  repaymentType:string;
  // 借款期限
  borrowDeadline:number;
  //借款标类型
  borrowmark:Mark;
  // 状态
  status:string;
  // 剩余投资金额
  remainderMoney:number;
  // 借款总利息
  totalInterest:number;
  // 最小购买金额 LEO 取出用于前台JS校验
  minBuyMoney:string;

  investments:[{}];

  auth:Auth;

  basicInfo:Basic;

  jobInfo:JobInfo;

  assetInfo:AssetInfo;
}

export class Mark{
  // 信用
  mark1:string;
  // 担保
  mark2:string;
  // 抵押
  mark3:string;
  // 实物认证
  mark4:string;
  // 本息保障
  mark5:string;
  // 流转
  mark6:string;
}

//借款人认证
export class Auth{
  name:string;
  status:string;
  time:string;
}
//借款人信息
export class Basic{
  nickname:string;
  gender:string;
  education:string;//学历
}

// 借款人工作信息

export class JobInfo{
  companyType:string;// 单位类别
  scale:string;   // 单位规模
  workYears:string;//工作年限
  workCity:string;//工作城市
  salary:string; //月收入
}
// 借款人资产信息
export class AssetInfo{
  houseStatus:boolean;
  mortgage:boolean;
  carStatus:boolean;
  carLoan:boolean;
}

export class Investment{
  userName:string;
  money:number;
  time:string;
}


export class TransferCreditor{
  id:number;
  title:string;
  transferMoney:number;//转让总金额
  profileRate:number;// 利率
  contract_No:string;//编号
  remainPeriods:number;//剩余期数
  remainMoney:number;//剩余投资金额
  status:string;// 状态
}
