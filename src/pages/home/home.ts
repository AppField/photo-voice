import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform, PopoverController } from 'ionic-angular';
import { PicturePost } from '../../model/picture-post.model';
import { PopoverMenuComponent } from '../../components/popover-menu/popover-menu';
import { AddPostPage } from '../add-post/add-post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  posts: PicturePost[] = [];
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private renderer: Renderer2) {
  }

  get isIOs(): boolean {
    return this.platform.is('ios');
  }

  ngOnInit() {
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

  addPost(): void {
    const addPostModal = this.modalCtrl.create(AddPostPage);
    addPostModal.onDidDismiss(newPost => {
      if (newPost) {
        this.posts.unshift(newPost);
      }
    });
    addPostModal.present()
  }

  onScroll(event): void {
    console.log(event);
    let scrollTop = this.platform.is('ios') ? 44 * 4 : 56 * 4;
    scrollTop = event.scrollTop > scrollTop ? scrollTop / 4 : event.scrollTop / 4;
    this.renderer.setStyle(this.searchbar.nativeElement, 'transform', `translate3d(0, ${scrollTop}px, 0)`);
    this.renderer.setStyle(this.content.nativeElement, 'transform', `translate3d(0, ${scrollTop}px, 0)`);
  }

}
