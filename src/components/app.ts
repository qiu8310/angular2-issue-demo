import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

let template = `
  <ol class="problems">
    <li><a [routerLink]="['FirstBackBroken']">First back not wrok after refresh page</a></li>
    <li><a [routerLink]="['URLQueryDisappear']">Custom url query paramater disappear</a></li>
    <li><a [routerLink]="['UpdateFromIframe']">update from iframe</a></li>
  </ol>
  <hr>

  <div class="content">
    <router-outlet></router-outlet>
  </div>

  <hr>
  <a [routerLink]="['Welcome']">Back to Home</a>
`;

let style = `
.problems { padding: 10px 20px 30px; }
.content { min-height: 200px; }
.router-link-active { color: red; }
`;

import {Welcome} from './Welcome';
import {FirstBackBroken} from './FirstBackBroken';
import {URLQueryDisappear} from './URLQueryDisappear';
import {UpdateFromIframe} from './UpdateFromIframe';


@Component({
  selector: '[as-app]',
  template,
  styles: [style],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    useAsDefault: true
  },
  {
    path: '/first/back/broken',
    name: 'FirstBackBroken',
    component: FirstBackBroken
  },
  {
    path: '/url/query/disappear',
    name: 'URLQueryDisappear',
    component: URLQueryDisappear
  },
  {
    path: '/update/from/iframe',
    name: 'UpdateFromIframe',
    component: UpdateFromIframe
  }
])
export class App {
  constructor() {}
}
