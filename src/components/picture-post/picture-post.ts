import { Component } from '@angular/core';
import {AboutPage} from "../../pages/about/about";

/**
 * Generated class for the PicturePostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'picture-post',
  templateUrl: 'picture-post.html'
})
export class PicturePostComponent {

  text: string;

  constructor() {
    console.log('Hello PicturePostComponent Component');
    this.text = 'Hello World';

  }
/*  openPiture(): void {
    this.navCtrl.push(AboutPage);
  }*/

}
