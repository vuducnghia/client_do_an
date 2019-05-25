import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UploadComponent } from './components/layout/upload/upload.component';
import { BodyComponent } from './components/layout/body/body.component';
import { HistoryComponent } from './components/layout/history/history.component';
import { ShowVideoComponent } from './components/layout/show-video/show-video.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { HomeComponent } from './components/layout/home/home.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { MyVideoComponent } from './components/layout/my-video/my-video.component';
import { VideoTranscriptComponent } from './components/layout/video-transcript/video-transcript.component';
import { TestComponent } from './components/layout/test/test.component';
import { LoginAdminComponent } from './components/layout-admin/login-admin/login-admin.component';
import { ManagerRequestComponent } from './components/layout-admin/manager-request/manager-request.component';
import { TestAdminComponent } from './components/layout-admin/test-admin/test-admin.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { ManagerVideoComponent } from './components/layout-admin/manager-video/manager-video.component';
import { AnalysisComponent } from './components/layout-admin/analysis/analysis.component';
import { ManagerUserComponent } from './components/layout-admin/manager-user/manager-user.component';
import { ManagerEngineComponent } from './components/layout-admin/manager-engine/manager-engine.component';
import { VideoCategoryComponent } from './components/layout/video-category/video-category.component';
import { ManagerLanguageComponent } from './components/layout-admin/manager-language/manager-language.component';
import { AuthUserGuard } from './services/guardUser.service';
import { AuthAdminVideoGuard } from './services/guardAdminVideo.service';
import { AuthAdminSystemGuard } from './services/guardAdminSystem.service';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, children: [
          { path: '', component: BodyComponent },
          // { path: 'history', component: HistoryComponent },
          { path: 'my-videos', component: MyVideoComponent, canActivate: [AuthUserGuard] },
          { path: 'profile', component: ProfileComponent, canActivate: [AuthUserGuard] },
          { path: 'my-videos/:idVideo', component: VideoTranscriptComponent, canActivate: [AuthUserGuard] },
          { path: 'show-video/:idVideo', component: ShowVideoComponent },
          { path: 'category/:category', component: VideoCategoryComponent },
        ]
      },
      { path: 'upload', component: UploadComponent, canActivate: [AuthUserGuard] }

    ]
  },
  {
    path: 'admin', component: LayoutAdminComponent, children: [
      { path: '', component: AnalysisComponent },
      { path: 'manage-request', component: ManagerRequestComponent , canActivate:[AuthAdminVideoGuard]},
      { path: 'manage-category', component: ManagerVideoComponent , canActivate:[AuthAdminVideoGuard]},
      { path: 'manage-users', component: ManagerUserComponent , canActivate:[AuthAdminSystemGuard]},
      { path: 'manage-engine', component: ManagerEngineComponent , canActivate:[AuthAdminVideoGuard]},
      { path: 'manage-language', component: ManagerLanguageComponent , canActivate:[AuthAdminVideoGuard]}

    ]
  },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'test', component: TestComponent },
  { path: 'admin-test', component: TestAdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
