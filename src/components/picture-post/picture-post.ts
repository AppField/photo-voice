import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PicturePost } from '../../model/picture-post.model';

@Component({
  selector: 'picture-post',
  templateUrl: 'picture-post.html'
})
export class PicturePostComponent {
  @Input() post: PicturePost;
  @Output() openDetail = new EventEmitter<PicturePost>();

  constructor() {
  }

  openPost(): void {
    this.openDetail.emit(this.post);
  }

  sharePost(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  playPost(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
