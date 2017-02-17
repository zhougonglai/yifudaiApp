import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";



@Injectable()
export class UserService {
  headers = new Headers({'Content-Type': 'application/json'});
  // url:string = "http://strong-qiang.xicp.net";
  url:string = "http://localhost:8100";

  constructor(public http: Http) {

  }

  //注册
  public registe(phone:number,verycode:number,password:string,recommendPhone?:number):Observable<{}>{
    return this.http.post(this.url+"/app/business/registe",{data:JSON.stringify({phone,verifyCode:verycode,passWord:password,recommendPhone:recommendPhone||""})},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //发送验证码
  public verycodeSend(phone:number):Observable<{}>{
    return this.http.post(this.url+"/app/query/phone_code",{data:JSON.stringify({phone:phone})},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //验证手机号
  public verycodeCheck(phone:number):Observable<{}>{
    return this.http.post(this.url+"/app/query/check_phone",{data:JSON.stringify({phone:phone})},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //登录认证
  public getUsers(phone:string,password:string):Observable<{}>{
    return this.http.post(this.url+"/app/query/login",{data:JSON.stringify({userName:phone,passWord:password})},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  // 获取User
  public getUserRemote(token:string):Observable<{}>{
    return this.http.post(this.url+"/app/query/user",{token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //投资
  public getDataList(){
    return this.http.get(this.url+"/app/query/index",{headers:this.headers}).map((res:Response) => res.json());
  }

  /**
   * 预期收益
   * @param actualInvMoney 投资金额
   * @param borrowMoney    借款总额
   * @param totalInterest  借款总利息
   */
  public Earnings(actualInvMoney:number,borrowMoney:number,totalInterest:number){
    return this.http.post(this.url+`/app/query/earnings?actualInvMoney=${actualInvMoney}&borrowMoney=${borrowMoney}&totalInterest=${totalInterest}`,{},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 个人支付
   * @param money 输入金额
   * @param token 密钥
   * @returns {Observable<R>}
   * @constructor
   */
  public PersonaPay(money:number,token:string){
    return this.http.post(this.url+"/app/query/personaPay",{data:JSON.stringify({money}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 投资
   * @param investId
   * @param inputMoney
   * @param strCoupon
   */
  public buy(token:string,investId:string,inputMoney:string,strCoupon:string){
    return this.http.post(this.url+"/app/business/buy",{data:JSON.stringify({id:investId,inputMoney,strCoupon}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   *  实名认证/certification
   */
  public certification(token:string,realName:string,idCardNumber:number){
    return this.http.post(this.url+"/app/business/certification",{data:JSON.stringify({realName,idCardNumber}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 设置支付密码
   * @param token
   */
  public setPaymenyPassword(token:string){
    return this.http.post(this.url+"/app/business/set_payment_password",{token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 受托支付
   * @param token
   */
  public setPayment(token:string){
    return this.http.post(this.url+"/app/business/set_payment",{token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 银行列表
   */
  public getBank(){
    return this.http.get(this.url+"/app/query/getbank",{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 城市列表
   */
  public getCity(){
    return this.http.get(this.url + "/app/query/getCity",{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 城市列表
   */
  public getCityMap(cityId:string){
    return this.http.get(this.url + `/app/query/getCityMap?cityId=${cityId}`,{headers:this.headers})
      .map((res:Response) => res.json());
  }

  /**
   * 绑卡
   * @param token
   * @param provinces
   * @param cities
   * @param cardID
   * @param bankCard_no
   * @param phone_no
   * @returns {Observable<R>}
   */
  public bindCard(token:string,provinces:string,cities:string,cardID:string,bankCard_no:string,phone_no:string){
    return this.http.post(this.url + "/app/business/bankinformation",{data:JSON.stringify({provinces,cities,cardID,bankCard_no,phone_no}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }


  public bindCardContinue(token:string,code:string,cardId:string){
    return this.http.post(this.url + "/app/business/securityinfo/continue",{data:JSON.stringify({code,cardId}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //借款 数据
  public borrowTermList(){
    return this.http.get(this.url + "/app/business/eliteloan/borrowTermList",{headers:this.headers})
      .map((res:Response) => res.json());
  }

  //借款 申请
  public borrowRequest(token:string,borrowMoney:string,selectItem:string,repaymentType:string){
    return this.http.post(this.url + "/app/business/eliteloan/borrowrequest",{data:JSON.stringify({borrowMoney,selectItem,repaymentType}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  // 自动投标
  public autoInvest(token:string,page:number = 1){
    return this.http.post(this.url+`/app/query/autoInvest`,{data:JSON.stringify({page:page.toString()}),token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  // 新增自动投标
  public autoMatic(token:string,amount:string,range_one:string,range_two:string,term_one:string,term_two:string,rating_one:string,rating_two:string,account:string){
    return this.http.post(this.url+`/app/query/automatic/save?amount=${amount}&&range_one=${range_one}&&range_two=${range_two}&&rating_one=${rating_one}&&rating_two=${range_two}&&account=${account}`,{token},{headers:this.headers})
      .map((res:Response) => res.json());
  }

  // 删除
  public deleteAutoMatic(id:number){
    return this.http.get(this.url+`/app/query/automatic/delete?id=${id}`,{headers:this.headers});
  }
}
