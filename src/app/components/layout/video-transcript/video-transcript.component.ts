import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'
declare const videojs: any
import '../../../../assets/js/videojs-transcript.js'

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

  constructor() { }
  status = 'Private'
  ngOnInit() {
    const player = videojs('video').ready(function () {
      // fire up the plugin
      // this['transcript'] = transcript

      console.log(this);
      const transcriptElem = this.transcript({
        autoscroll: true,
        clickArea: 'text',
        showTitle: true,
        showTrackSelector: true,
        followPlayerTrack: true,
        scrollToCenter: false,
        stopScrollWhenInUse: true,
      })
      console.log('transcript', transcriptElem)
      // attach the widget to the page
      const transcriptContainer = document.querySelector('#transcript');
      transcriptContainer.appendChild(transcriptElem.el());
    });
  }

  changeStatus(){
    this.status = 'Request Public'
  }
}
