import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';


if (__BUILD__) {
  enableProdMode();
}

import {App} from './components/app';


if (G.hashbang) {
  bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
} else {
  bootstrap(App, [ROUTER_PROVIDERS]);
}

