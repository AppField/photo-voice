import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PicturePostComponent } from '../components/picture-post/picture-post';
import { PopoverMenuComponent } from '../components/popover-menu/popover-menu';
import { Camera } from '@ionic-native/camera';
import { AddPostPageModule } from '../pages/add-post/add-post.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PicturePostComponent,
    PopoverMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddPostPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PopoverMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera
  ]
})
export class AppModule {
}
