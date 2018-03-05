import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PicturePost } from '../../model/picture-post.model';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'picture-post',
  templateUrl: 'picture-post.html'
})
export class PicturePostComponent {
  isAudioPlaying = false;

  @Input() post: PicturePost;
  @Output() openDetail = new EventEmitter<PicturePost>();
  private audio: MediaObject;

  constructor(
    private platform: Platform,
    private media: Media,
    private file: File) {
  }

  openPost(): void {
    this.openDetail.emit(this.post);
  }

  sharePost(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  playAudio(): void {
    if (this.platform.is('ios')) {
      const filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.post.audioFilename;
      this.audio = this.media.create(filePath);
    } else if (this.platform.is('android')) {
      const filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.post.audioFilename;
      this.audio = this.media.create(filePath);
    }
    this.isAudioPlaying = true;
    this.audio.play();
  }

  pauseAudio(): void {
    this.audio.stop();
    this.isAudioPlaying = false
  }

}
