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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { VideoService } from './services/video.service';
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HomeComponent } from './components/layout/home/home.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { CategoryService } from './services/category.service';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { CommonModule } from '@angular/common';
import { MyVideoComponent } from './components/layout/my-video/my-video.component';
import { VideoTranscriptComponent, dateFormatPipe } from './components/layout/video-transcript/video-transcript.component';
import { EngineService } from './services/engine.service';
import { TestComponent } from './components/layout/test/test.component';
import { LoginAdminComponent } from './components/layout-admin/login-admin/login-admin.component';
import { AdminService } from './services/admin.service';
import { MenuAdminComponent } from './components/layout-admin/menu-admin/menu-admin.component';
import { ManagerRequestComponent } from './components/layout-admin/manager-request/manager-request.component';

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
    FileSelectDirective,
    HomeComponent,
    LayoutAdminComponent,
    MyVideoComponent,
    VideoTranscriptComponent,
    dateFormatPipe,
    TestComponent,
    LoginAdminComponent,
    MenuAdminComponent,
    ManagerRequestComponent
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    
    FormsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    UserService,
    AdminService,
    VideoService,
    CategoryService,
    EngineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
