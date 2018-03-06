import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, Platform, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage implements OnInit {
  base64Image: string;

  // Recording
  recording = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  isPlaying = false;
  private storageDirectory: any;

  constructor(
    private platform: Platform,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private camera: Camera,
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

  ngOnInit() {
    this.takePicture();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  takePicture(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  startRecord(): void {
    console.log('start recording');
    if (this.platform.is('ios')) {
      this.fileName = 'Photo Voice record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
      this.filePath = this.storageDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'Photo Voice record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
      this.filePath = this.storageDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    console.log('filename:', this.fileName);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord(): void {
    this.audio.stopRecord();
    this.recording = false;
  }

  playAudio(): void {
    if (this.platform.is('ios')) {
      this.filePath = this.storageDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.storageDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.isPlaying = true;
  }

  pauseAudio(): void {
    this.audio.pause();
    this.isPlaying = false;
  }

  dismiss() {
    let newPost = null;
    if (this.base64Image) {
      newPost = {
        id: 'asdf23',
        title: 'Pretty Birdman',
        description: 'This is a very nice bird. And he\'s actually a person and comes from another planet.',
        image: this.base64Image,
        audioFilename: this.fileName
      };
    }

    this.viewCtrl.dismiss(newPost);
  }

}
