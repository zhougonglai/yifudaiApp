import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'masks'
})
@Injectable()
export class Masks {
  transform(value,bool) {
    return bool?value:"***";
  }
}
