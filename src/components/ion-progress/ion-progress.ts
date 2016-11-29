import { Component,Input} from '@angular/core';
// import { IONIC_DIRECTIVES } from "ionic-angular";

/*
  Generated class for the IonProgress component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
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
