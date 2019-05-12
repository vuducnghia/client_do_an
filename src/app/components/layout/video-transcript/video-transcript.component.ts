import { Component, OnInit, Pipe, PipeTransform, AfterViewInit } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'
declare const videojs: any
import '../../../../assets/js/videojs-transcript.js'
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { EngineService } from '../../../services/engine.service';
declare var $: any;
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
  status
  myPlayer
  url
  idVideo
  nameEngine
  engines = []
  transcripts = [];
  listLanguages = [];
  // engine
  nameEngineTranslate = 'google';
  languageTranslate = 'english';
  nameVideo = '';
  _this = this
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private engineService: EngineService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoService.getVideoById(params.idVideo).subscribe((video: any) => {
        console.log(video)
        this.nameVideo = video.title;
        // console.log(video)
        this.idVideo = video._id;
        if (document.getElementById("showVideo").firstChild) {
          document.getElementById("showVideo").firstChild.remove()
        }
        let tracks = []
        let idRandom = 'id' + Math.random().toString(36).substring(7);
        console.log(video)
        this.status = video.status
        video.transcripts.forEach(transcript => {
          tracks.push({
            src: `http://localhost:8081/api/transcript/${transcript.idTranscript}`,
            kind: 'captions', srclang: 'en', label: transcript.language
          })
          this.listLanguages.push({
            language: transcript.language,
            idTranscript: transcript.idTranscript
          })
          this.engines.push(transcript.nameEngine)
        });

        console.log(this.nameEngine)
        document.getElementById("showVideo").innerHTML = `
          <video id="${idRandom}" class="video-js vjs-default-skin" height="360px" width="650px" controls 
          >
          <p>
            Your browser doesn't support video. Please <a href="http://browsehappy.com/">upgrade your browser</a> to see
            the example.
          </p>
          <source src="http://localhost:8081/api/play/`+ video.thumbnail + `" type="video/mp4">
        </video>
          `

        if (tracks.length > 0) {
          videojs(`#${idRandom}`, {
            tracks: tracks
          });
        }


        this.url = "http://localhost:8081/api/play/" + video.thumbnail
        console.log(this.url)

        this.init(idRandom)
      })
    })
  }

  init(idRandom) {
    const player = videojs('' + idRandom).ready(function () {
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
    if (this.status !== 'requesting') {
      this.videoService.updateStatusByIdVideo(this.idVideo, 'requesting').subscribe(videos => {

      }, err => {
        console.log(err)
      })
    }
  }


  edit(idTranscript) {
    if (idTranscript) {
      this.videoService.getDataTranscriptById(idTranscript).subscribe((transcripts: any) => {
        this.transcripts = transcripts
      }, err => {
        console.log(err)
      })
    }
  }

  saveTranscript() {
    $('.bd-example-modal-lg').modal('hide');
  }

  startTranslate() {
    if (this.nameEngineTranslate && this.languageTranslate) {
      this.engineService.translateEngine(this.nameEngineTranslate, this.languageTranslate, this.idVideo).subscribe(result => {
        console.log(result)
      })
      $('.translate-bd-example-modal-lg').modal('hide');
    }
  }

  onChangeEngineTranslate(value) {
    this.nameEngineTranslate = value;
  }
  onChangeLanguage(language) {
    this.languageTranslate = language;
  }
}
