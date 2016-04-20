import {Component} from 'angular2/core';
import {Location} from 'angular2/router';


let template = `<div>
  <button (click)="locationBack()">Angular Location.back()</button>
  <button (click)="historyBack()">Browser History.back()</button>
  <p>The buttons will work if you don't refresh page.</p>
  <p>If you refresh this page one time, it will <b>not work</b> on first click</p>
  <p>If you refresh this page two time, it will <b>not work</b> on the first two click</p>
  <p>and so on...</p>
</div>`;

@Component({
  selector: '[as-first-back-broken]',
  template
})
export class FirstBackBroken {
  constructor(private location: Location) {}

  locationBack() {
    this.location.back();
  }

  historyBack() {
    history.back();
  }
}
