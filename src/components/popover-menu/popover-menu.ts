import { Component } from '@angular/core';

/**
 * Generated class for the PopoverMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-menu',
  templateUrl: 'popover-menu.html'
})
export class PopoverMenuComponent {

  text: string;

  constructor() {
    console.log('Hello PopoverMenuComponent Component');
    this.text = 'Hello World';
  }

}
