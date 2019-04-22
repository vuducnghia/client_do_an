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

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // {path: '', component: BodyComponent},
      // {path: 'history', component: HistoryComponent},
      // {path: 'show-video', component: ShowVideoComponent},
      {
        path: '', component: HomeComponent, children: [
          { path: '', component: BodyComponent },
          { path: 'history', component: HistoryComponent },
          { path: 'my-videos', component: MyVideoComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'my-videos/:idVideo', component: VideoTranscriptComponent },
          { path: 'show-video/:idVideo', component: ShowVideoComponent },
        ]
      },
      { path: 'upload', component: UploadComponent }

    ]
  },
  {
    path: 'admin', component: LayoutAdminComponent, children: [
      { path: '', component: AnalysisComponent },
      { path: 'manage-request', component: ManagerRequestComponent },
      { path: 'manage-video', component: ManagerVideoComponent },
      { path: 'manage-users', component: ManagerUserComponent },
      { path: 'manage-engine', component: ManagerEngineComponent }
      
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
