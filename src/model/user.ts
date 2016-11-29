export default class User{
  //名字
  private _name:string;
  //总资产
  private _property:number;
  //余额
  private _balance:number;
  //银行卡
  private _card:number;
  //累计收益
  private _earnings:number;
  //邀请
  private _invite:number;

  phone?:number;
  password?:string;

  constructor(user:{name: string, property: number, balance: number, card: number, earnings: number, invite: number}) {
    this._name = user.name;
    this._property = user.property;
    this._balance = user.balance;
    this._card = user.card;
    this._earnings = user.earnings;
    this._invite = user.invite;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get property(): number {
    return this._property;
  }

  set property(value: number) {
    this._property = value;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }

  get card(): number {
    return this._card;
  }

  set card(value: number) {
    this._card = value;
  }

  get earnings(): number {
    return this._earnings;
  }

  set earnings(value: number) {
    this._earnings = value;
  }

  get invite(): number {
    return this._invite;
  }

  set invite(value: number) {
    this._invite = value;
  }
}
