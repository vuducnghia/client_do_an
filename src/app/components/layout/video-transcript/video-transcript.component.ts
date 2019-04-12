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
  // url
  url = 'http://localhost:8081/api/play/c8e2490ae61523fd1c2a990c1a6ed90f'
  myPlayer
  stream1 = "http://localhost:8081/api/play/c55499cbeced27fbefb2590724f9f0df";
  stream2 = "http://localhost:8081/api/play/c8e2490ae61523fd1c2a990c1a6ed90f";
  current_stream = this.stream1;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      // this.videoService.getVideoById(params.idVideo).subscribe((video: any) => {
      //   console.log(video)
      //   this.url="http://localhost:8081/api/play/c55499cbeced27fbefb2590724f9f0df"
      //   console.log(this.url)        
      // })
      this.url = "http://localhost:8081/api/play/" + params.path;
      // console.log(this.url)
      // this.url="http://localhost:8081/api/play/c55499cbeced27fbefb2590724f9f0df"
    })
    const _this = this;
    // const player = videojs('video').ready(function () {
    //   // fire up the plugin
    //   // this['transcript'] = transcript

    //   console.log('333333333333', _this.url)
    //   let myPlayer = this;
    //   myPlayer.src({ type: 'video/mp4', src: _this.url });
    //   // myPlayer.play()

    //   const transcriptElem = this.transcript({
    //     autoscroll: true,
    //     clickArea: 'text',
    //     showTitle: true,
    //     showTrackSelector: true,
    //     followPlayerTrack: true,
    //     scrollToCenter: false,
    //     stopScrollWhenInUse: true,
    //   })
    //   // console.log('transcript', transcriptElem)
    //   // attach the widget to the page
    //   const transcriptContainer = document.querySelector('#transcript');
    //   transcriptContainer.appendChild(transcriptElem.el());
    // });


  }
  start() {
    // const _this = this;
    // const player = videojs('video')
    // player.dispose()
    // player.src({ type: 'video/mp4', src: _this.url })
    // player.reset();
    console.log(this.url)
    videojs('video').src({ type: 'video/mp4', src: this.url })
  }


  start_viblast() {
    videojs('#video', {});
    videojs('#video').src({ type: 'video/mp4', src:this.current_stream});
  }

  stop_viblast() {
    videojs('#video').pause();
    videojs('#video').currentTime(0);

  }

  changesrc_viblast() {
    if (this.current_stream === this.stream1) {
      this.current_stream = this.stream2;
    } else {
      this.current_stream = this.stream1;
    }
    this.start_viblast();
  }

  changeStatus() {
    this.status = 'Request Public'
  }
}
