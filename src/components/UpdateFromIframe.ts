import {Component} from 'angular2/core';

let template = `
  <div>
    <button (click)="normalUpdate()">Normal Update</button>
    <button (click)="loadIframeToUpdate()">Load iframe to Update</button>
    <p>
      {{text}}
    </p>
  </div>
`;


@Component({
  selector: '[as-update-from-iframe]',
  template
})
export class UpdateFromIframe {
  text: string = 'init';

  normalUpdate() {
    this.text = 'I am in the Component, time: ' + new Date;
  }

  loadIframeToUpdate() {
    let iframe = document.createElement('iframe');
    let callback = 'callback' + Date.now();
    iframe.style.display = 'none';
    window[callback] = (text) => {
      console.log('update from iframe executed');
      this.text = text;
      delete window[callback];
    }

    document.body.appendChild(iframe);
    iframe.src = '/assets/iframe.html?callback=' + callback;
  }
}
