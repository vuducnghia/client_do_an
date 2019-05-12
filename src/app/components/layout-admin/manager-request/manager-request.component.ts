import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-manager-request',
  templateUrl: './manager-request.component.html',
  styleUrls: ['./manager-request.component.scss']
})
export class ManagerRequestComponent implements OnInit {
  rejected = false;
  pending = true;
  public = false;
  videos = []
  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.videoService.getVideoByStatus('requesting').subscribe(videos => {
      console.log(videos)
      this.videos = videos;
    }, err => {
      console.log(err)
    })
  }

  reject(id) {
    console.log(id)
    this.videoService.updateStatusByIdVideo(id, 'reject').subscribe(videos => {

    }, err => {
      console.log(err)
    })
  }

  approve(id) {
    this.videoService.updateStatusByIdVideo(id, 'public').subscribe(videos => {

    }, err => {
      console.log(err)
    })
  }

  addClass(event, name, bool) {
    if (bool == true) {
      event.srcElement.classList.add(name);
    } else {
      event.srcElement.classList.remove(name);
    }

    this.videos = [];

    if (this.rejected == true) {
      this.videoService.getVideoByStatus('reject').subscribe(videos => {

        videos.forEach(video => {
          this.videos.push(video)
        });
      })
    }
    if (this.pending == true) {
      this.videoService.getVideoByStatus('requesting').subscribe(videos => {
        videos.forEach(video => {
          this.videos.push(video)
        });
      })
    }
    if (this.public == true) {
      this.videoService.getVideoByStatus('public').subscribe(videos => {
        videos.forEach(video => {
          this.videos.push(video)
        });
      })
    }
  }
}
