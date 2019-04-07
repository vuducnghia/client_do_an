import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {
  idVideo
  videoOgirin: any
  url
  listVideo = []
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idVideo = params.idVideo;
      this.videoService.getVideoById(this.idVideo).subscribe(video => {
        console.log(video)
        this.videoOgirin = video
        this.url = "http://localhost:8081/api/play/" + this.videoOgirin.thumbnail;
        this.videoService.getVideoByCategory(this.videoOgirin.category).subscribe(videos => {
          this.listVideo = videos;
        })
      })
    });
  }

  a(id) {
    this.url = "http://localhost:8081/api/play/" + id
    let x = <HTMLVideoElement>document.getElementById("myVideo");
    x.load();
  }
}
