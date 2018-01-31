import {Component} from '@angular/core';

@Component({
  selector: 'layout',
  template: `
    <div class="layout">
      <ngrc-header></ngrc-header>
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutComponent {
}
