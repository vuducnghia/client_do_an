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
import { ManagerRequestComponent } from './components/layout-admin/manager-request/manager-request.component';
import { TestAdminComponent } from './components/layout-admin/test-admin/test-admin.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { ManagerVideoComponent } from './components/layout-admin/manager-video/manager-video.component';
import { AnalysisComponent } from './components/layout-admin/analysis/analysis.component';
import { ManagerUserComponent } from './components/layout-admin/manager-user/manager-user.component';
import { ManagerEngineComponent } from './components/layout-admin/manager-engine/manager-engine.component';
import { CommentComponent } from './components/layout/comment/comment.component';
import { VideoCategoryComponent } from './components/layout/video-category/video-category.component';
import { ManagerLanguageComponent } from './components/layout-admin/manager-language/manager-language.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthUserGuard } from './services/guardUser.service';
import { AuthAdminVideoGuard } from './services/guardAdminVideo.service';
import { AuthAdminSystemGuard } from './services/guardAdminSystem.service';
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
    ManagerRequestComponent,
    TestAdminComponent,
    ProfileComponent,
    ManagerVideoComponent,
    AnalysisComponent,
    ManagerUserComponent,
    ManagerEngineComponent,
    CommentComponent,
    VideoCategoryComponent,
    ManagerLanguageComponent
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    UserService,
    AdminService,
    VideoService,
    CategoryService,
    EngineService,
    AuthUserGuard,
    AuthAdminVideoGuard,
    AuthAdminSystemGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
