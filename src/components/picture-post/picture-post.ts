import { Component, Input } from '@angular/core';
import { PicturePost } from '../../model/picture-post.model';

@Component({
  selector: 'picture-post',
  templateUrl: 'picture-post.html'
})
export class PicturePostComponent {
  @Input() post: PicturePost;

  constructor() {
  }

  /*  openPiture(): void {
      this.navCtrl.push(AboutPage);
    }*/

}
