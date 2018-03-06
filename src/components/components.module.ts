import { NgModule } from '@angular/core';
import { PopoverMenuComponent } from './popover-menu/popover-menu';
import { PicturePostComponent } from './picture-post/picture-post';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PopoverMenuComponent, PicturePostComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(PopoverMenuComponent),
    IonicModule.forRoot(PicturePostComponent)
  ],
  exports: [PopoverMenuComponent, PicturePostComponent],
  entryComponents:
    [PopoverMenuComponent]
})

export class ComponentsModule {
}
