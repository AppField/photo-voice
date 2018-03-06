import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PicturePost } from '../../model/picture-post.model';
import { File } from '@ionic-native/file';
import { Media, MEDIA_ERROR, MEDIA_STATUS, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'picture-post',
  templateUrl: 'picture-post.html'
})
export class PicturePostComponent {
  duration = -1;
  position = 0;
  isPlaying = false;
  durationInterval: number;
  positionInterval: number;
  @Input() post: PicturePost;
  @Output() openDetail = new EventEmitter<PicturePost>();
  private storageDirectory: any;
  private audio: MediaObject;

  constructor(
    private platform: Platform,
    private media: Media,
    private file: File) {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });
  }

  openPost(): void {
    this.openDetail.emit(this.post);
  }

  sharePost(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  playAudio(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.audio) {
      this.audio.play();
    } else {
      this.setupAudio();
    }
  }

  pauseAudio() {
    this.audio.pause();
    this.isPlaying = false;
  }

  private setupAudio() {
    this.position = 0;
    this.audio = this.createAudioFile(this.post.audioFilename);
    this.audioHandlers();
    this.audio.play();
    this.isPlaying = true;
    this.durationInterval = setInterval(() => {
      if (this.duration == -1) {
        console.log('get duration and play!');
        console.log('duration', this.audio.getDuration());
        this.duration = ~~(this.audio.getDuration());  // make it an integer
        console.log('used duration', this.duration);
        // this.duration_string = this.fmtMSS(this.duration);   // replaced by the Angular DatePipe
      } else {
        console.log('duration is not -1, clear interval');
        this.startPositionInterval();
        clearInterval(this.durationInterval);
      }
    }, 100);
  }

  private startPositionInterval() {
    let diff = 1;
    this.positionInterval = setInterval(() => {
      let last_position = this.position;
      this.audio.getCurrentPosition().then((position) => {
        console.log('position', position);
        if (position >= 0 && position < this.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            this.audio.seekTo(last_position * 1000);
          } else {
            // update position for display
            this.position = position;
          }
        } else if (position >= this.duration) {
          this.clearAudio();
        }
      });
    }, 100);
  }

  private clearAudio(): void {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.release();
      this.audio = null;
    }
    clearInterval(this.positionInterval);
  }

  private audioHandlers(): void {
    this.audio.onError.subscribe((error: MEDIA_ERROR) => {
      console.log('error while playing', error);
      this.isPlaying = false;
      this.audio.release();
      clearInterval(this.positionInterval);
    });

    this.audio.onStatusUpdate.subscribe((status: MEDIA_STATUS) => {
      switch (status) {
        case 2:
          //playing
          this.isPlaying = true;
          break;
        case 3:
          //pause
          this.isPlaying = false;
          break;
        case 4:
          //stop
          this.clearAudio();
      }
    });
  }

  private createAudioFile(filename): MediaObject {
    if (this.platform.is('ios')) {  //ios
      return this.media.create((this.storageDirectory).replace(/^file:\/\//, '') + '/' + filename);
    } else {  // android
      return this.media.create(this.storageDirectory + filename);
    }
  }
}
