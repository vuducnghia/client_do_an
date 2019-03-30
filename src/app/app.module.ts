import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BodyComponent } from './components/layout/body/body.component';
import { MenuLeftComponent } from './components/layout/menu-left/menu-left.component';
import { UploadComponent } from './components/layout/upload/upload.component';
import { HistoryComponent } from './components/layout/history/history.component';
import { ShowVideoComponent } from './components/layout/show-video/show-video.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { VideoService } from './services/video.service';
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    BodyComponent,
    MenuLeftComponent,
    UploadComponent,
    HistoryComponent,
    ShowVideoComponent,
    PageNotFoundComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UserService,
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
