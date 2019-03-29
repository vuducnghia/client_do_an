import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {UploadComponent} from './components/layout/upload/upload.component';
import {BodyComponent} from './components/layout/body/body.component';
import {HistoryComponent} from './components/layout/history/history.component';
import {ShowVideoComponent} from './components/layout/show-video/show-video.component';
import {PageNotFoundComponent} from './components/layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: BodyComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'show-video', component: ShowVideoComponent}

    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'upload', component: UploadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
