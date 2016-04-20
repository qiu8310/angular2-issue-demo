import {Component} from 'angular2/core';
import {Location} from 'angular2/router';


let base = location.href.split(/[\?#]/)[0];


let template = `<div>

  Click here <a [href]="url">{{url}}</a>. The query "foo=bar" will disappear.

</div>`;

@Component({
  selector: '[as-url-query-disappear]',
  template
})
export class URLQueryDisappear {
  url: string;
  constructor(private location: Location) {}
  ngOnInit() {
    this.url = base + '?foo=bar#' + this.location.path();
  }
}
