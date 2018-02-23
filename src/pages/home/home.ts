import { Component, OnInit } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { PicturePost } from '../../model/picture-post.model';
import { PopoverMenuComponent } from '../../components/popover-menu/popover-menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  posts: PicturePost[];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private  popoverCtrl: PopoverController) {
  }

  get isIOs(): boolean {
    return this.platform.is('ios');
  }

  ngOnInit() {
    this.posts = [];
    for (let i = 0; i < 5; i++) {
      this.posts.push({
        id: 'asdf23',
        title: 'Pretty Birdman',
        description: 'This is a very nice bird. And he\'s actually a person and comes from another planet.',
        image: 'http://imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg',
      });
    }
  }

  openDetailView(post: PicturePost): void {
    console.log('open detail, post', post);
  }

  openMenu(event): void {
    const popover = this.popoverCtrl.create(PopoverMenuComponent);
    popover.present({
      ev: event
    });
  }

}
