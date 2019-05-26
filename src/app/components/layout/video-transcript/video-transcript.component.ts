import { Component, OnInit, Pipe, PipeTransform, AfterViewInit } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'
declare const videojs: any
import '../../../../assets/js/videojs-transcript.js'
import { ActivatedRoute, Router } from '@angular/router';
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
  engines = [];
  listIdTranscript = [];
  transcripts = [];
  listLanguages = [];
  isDisable: Boolean = false;
  // engine
  nameEngineTranslate = 'google';
  languageTranslate = 'english';
  nameVideo = '';
  idTranscript = '';
  _this = this
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private engineService: EngineService
  ) { }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.videoService.getVideoById(params.idVideo).subscribe((video: any) => {
        this.nameVideo = video.title;
        this.idVideo = video._id;
        if (document.getElementById("showVideo").firstChild) {
          document.getElementById("showVideo").firstChild.remove()
        }
        let tracks = []
        this.listIdTranscript = [];
        let idRandom = 'id' + Math.random().toString(36).substring(7);
        this.status = video.status;
        if (status === 'processing' || status === 'public' || status === 'reject') {
          this.isDisable = true
        }
        video.transcripts.forEach(transcript => {
          tracks.push({
            src: `http://localhost:8081/api/transcript/${transcript.idTranscript}`,
            kind: 'captions', srclang: transcript.language
          });
          this.listIdTranscript.push({
            language: transcript.language,
            id: transcript.idTranscript
          })
          this.listLanguages.push({
            language: transcript.language,
            idTranscript: transcript.idTranscript
          })
          this.engines.push(transcript.nameEngine)
        });

        document.getElementById("showVideo").innerHTML = `
          <video id="${idRandom}" class="video-js vjs-default-skin" height="360px" width="650px" controls >
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
      // delete all transcript template before add transcript
      while (transcriptContainer.firstChild) {
        transcriptContainer.removeChild(transcriptContainer.firstChild);
      }
      transcriptContainer.appendChild(transcriptElem.el());
    });
  }

  changeStatus() {
    if (this.status === 'private') {
      this.videoService.updateStatusByIdVideo(this.idVideo, 'requesting').subscribe(videos => {
        this.status = 'requesting'
      }, err => {
        console.log(err)
      })
    }
    if (this.status === 'requesting') {
      this.videoService.updateStatusByIdVideo(this.idVideo, 'private').subscribe(videos => {
        this.status = 'private'
      }, err => {
        console.log(err)
      })
    }
  }


  edit(idTranscript) {
    if (idTranscript) {
      this.idTranscript = idTranscript;
      this.videoService.getDataTranscriptById(idTranscript).subscribe((transcripts: any) => {
        this.transcripts = transcripts
      }, err => {
        console.log(err);
      })
    }
  }

  saveTranscript() {
    $('.bd-example-modal-lg').modal('hide');
    console.log(this.transcripts);
    if (this.idTranscript) {
      this.videoService.updateTranscript(this.idVideo, this.idTranscript, this.transcripts).subscribe(result => {
        console.log(result);
        this.idTranscript = '';
        if (document.getElementById("showVideo").firstChild) {
          document.getElementById("showVideo").firstChild.remove()
        }
        this.ngOnInit();
      }, err => {
        console.log(err);
      })
    }

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

  deleteVideo() {

    this.router.navigate(['/my-videos']);
    this.videoService.updateStatusByIdVideo(this.idVideo, 'deleted').subscribe(videos => {
      alert('delete success');
      this.router.navigate(['/my-videos']);
    }, err => {
      console.log(err)
    })
  }
}
