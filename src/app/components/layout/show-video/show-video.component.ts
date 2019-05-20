import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  idVideo
  videoOgirin: any
  url
  listVideo = [];
  comments = [];
  reply = false;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idVideo = params.idVideo;
      this.videoService.getVideoById(this.idVideo).subscribe(video => {
        this.videoOgirin = video
        this.url = "http://localhost:8081/api/play/" + this.videoOgirin.thumbnail;
        this.videoService.getVideoByCategory(this.videoOgirin.category, true).subscribe(videos => {
          this.listVideo = videos;
        })
      });

      this.videoService.getCommentByIdVideo(this.idVideo).subscribe(comments => {
        this.comments = comments;
      });
    });
  }

  a(id) {
    this.url = "http://localhost:8081/api/play/" + id
    let x = <HTMLVideoElement>document.getElementById("myVideo");
    x.load();
  }

  sendComment() {
    if (this.myInput.nativeElement.value) {
      
      this.videoService.addCommentByIdVideo(this.idVideo, this.myInput.nativeElement.value).subscribe(data => {
        this.myInput.nativeElement.value = ''
        this.comments.unshift(data)
      }, err => {
        console.log(err)
      })
    }

  }
}
