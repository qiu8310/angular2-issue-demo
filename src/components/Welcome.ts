import {Component} from 'angular2/core';

let template = `
  <div>
    <h2><center>Welcome</center></h2>
  </div>
`;

@Component({
  selector: '[as-welcome]',
  template
})
export class Welcome {

}
