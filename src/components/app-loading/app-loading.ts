import { Component } from '@angular/core';


@Component({
  selector: 'app-loading',
  templateUrl: 'app-loading.html'
})
export class AppLoadingComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
