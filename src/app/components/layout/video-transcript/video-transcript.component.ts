import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
// import { videojs } from "video.js";
// import{transcript} from '../../../../assets/js/videojs-transcript.min.js';

declare var videojs: any;
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

  ngOnInit() {
    // const video = videojs('video').ready(function(){
    //   // Set up any options.
    //   const options = {
    //     showTitle: false,
    //     showTrackSelector: false,
    //   };

    //   // Initialize the plugin.
    //   const transcriptInstance = transcript(options);

    //   // Then attach the widget to the page.
    //   var transcriptContainer = document.querySelector('#transcript');
    //   transcriptContainer.appendChild(transcript.el()); 
    // });
  }


}
