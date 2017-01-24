import { Component,Input} from '@angular/core';

@Component({
  selector: 'ion-progress',
  templateUrl: 'ion-progress.html'
})
export class IonProgressComponent{
  _max?:number;
  _existed?:number;

  constructor() {

  }
  @Input()
  set max(max:number){
    if(max){
      this._max = max;
    }
  }

  @Input()
  set existed(existed:number){
    if(existed){
      this._existed = existed;
    }
  }

}
