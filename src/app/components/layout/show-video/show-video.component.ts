import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import * as videojs from '../../../../assets/js/video.js'
declare const videojs: any;
declare var $: any;
@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  idVideo
  videoOgirin: any
  url;
  listIdTranscript = [];
  listVideo = [];
  comments = [];
  reply = false;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
  ) { }
  // aaa='http://localhost:8081/api/transcript/5554ca03-2712-4299-8dbd-b139c691f6a1Vietnamese500427796'
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idVideo = params.idVideo;
      this.videoService.getVideoById(this.idVideo).subscribe(video => {
        this.videoOgirin = video
        this.url = "http://localhost:8081/api/play/" + this.videoOgirin.thumbnail;
        this.videoService.getVideoByCategory(this.videoOgirin.category, true).subscribe(videos => {
          this.listVideo = videos;
        });
        let idRandom = 'id' + Math.random().toString(36).substring(7);


        document.getElementById("showVideo").innerHTML = `
          <video id="${idRandom}" class="video-js vjs-default-skin" height="376px" width="700px" controls>
            <p>
              Your browser doesn't support video. Please <a href="http://browsehappy.com/">upgrade your browser</a> to see
              the example.
            </p>
            <source src="${this.url}` + `" type="video/mp4">
          </video>
          `
        let tracks = [];
        this.videoOgirin.transcripts.forEach(transcript => {
          tracks.push({
            src: `http://localhost:8081/api/transcript/${transcript.idTranscript}`,
            kind: 'captions', srclang: 'en', label: transcript.language
          });
          this.listIdTranscript.push({
            language: transcript.language,
            id: transcript.idTranscript
          })
        });

        if (tracks.length > 0) {
          videojs(`#${idRandom}`, {
            tracks: tracks
          });
        }


      });

      this.videoService.getCommentByIdVideo(this.idVideo).subscribe(comments => {
        this.comments = comments;
      });
    });
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
