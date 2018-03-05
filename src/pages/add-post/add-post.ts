import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage implements OnInit {
  base64Image: string;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private camera: Camera) {
  }

  ngOnInit() {
    this.takePicture();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  takePicture(): void {
    const options: CameraOptions = {
      quality: 100,
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

  dismiss() {
    let newPost = null;
    if (this.base64Image) {
      newPost = {
        id: 'asdf23',
        title: 'Pretty Birdman',
        description: 'This is a very nice bird. And he\'s actually a person and comes from another planet.',
        image: this.base64Image,
      };
    }

    this.viewCtrl.dismiss(newPost);
  }

}
