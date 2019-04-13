import { Component, OnInit, Pipe, PipeTransform, AfterViewInit } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'
declare const videojs: any
import '../../../../assets/js/videojs-transcript.js'
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';

@Pipe({
  name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
  transform(sec_num) {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));
    let h = hours.toString(), m = minutes.toString(), s = seconds.toString();

    if (hours < 10) { h = "0" + hours; }
    if (minutes < 10) { m = "0" + minutes; }
    if (seconds < 10) { s = "0" + seconds; }

    return h + ':' + m + ':' + s;
  }
}

@Component({
  selector: 'app-video-transcript',
  templateUrl: './video-transcript.component.html',
  styleUrls: ['./video-transcript.component.scss']
})
export class VideoTranscriptComponent implements OnInit {
  status = 'Private'
  myPlayer
  url
  _this = this
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoService.getVideoById(params.idVideo).subscribe((video: any) => {

        if (document.getElementById("showVideo").firstChild) {
          document.getElementById("showVideo").firstChild.remove()
        }
        let x = Math.random() * 10;
        let track
        let idRandom ='id'+ Math.random().toString(36).substring(7);

        document.getElementById("showVideo").innerHTML = `
          <video id="${idRandom}" class="video-js vjs-default-skin" height="360px" width="650px" controls 
          src="http://localhost:8081/api/play/`+ video.thumbnail + `">
          <p>
            Your browser doesn't support video. Please <a href="http://browsehappy.com/">upgrade your browser</a> to see
            the example.
          </p>
        </video>
          `
        if (x > 5) {
          console.log(1)
          track = 'test.vtt'
          videojs(`#${idRandom}`).addRemoteTextTrack({
            kind: 'captions',
            label: 'user defined',
            src: 'http://localhost:4200/assets/test.vtt'
          }, false)
        }
        else {
          console.log(2)
          track = 'test1.vtt'
          videojs(`#${idRandom}`).addRemoteTextTrack({
            kind: 'captions',
            label: 'user defined',
            src: 'http://localhost:4200/assets/test1.vtt'
          }, false)
        }

        this.url = "http://localhost:8081/api/play/" + video.thumbnail
        console.log(this.url)

        this.init(idRandom)
      })
    })
  }

  init(idRandom) {
    const player = videojs(''+idRandom).ready(function () {
      const transcriptElem = this.transcript({
        autoscroll: true,
        clickArea: 'text',
        showTitle: true,
        showTrackSelector: true,
        followPlayerTrack: true,
        scrollToCenter: false,
        stopScrollWhenInUse: true,
      })

      const transcriptContainer = document.querySelector('#transcript');
      transcriptContainer.appendChild(transcriptElem.el());
    });
  }

  changeStatus() {
    this.status = 'Request Public'
  }
}
