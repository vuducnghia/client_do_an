import { Component, OnInit } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'

// import * as main from '../../../../assets/videojs-transcript/src/main.js';
// import * as transcript from '../../../../assets/js/videojs-transcript.js'

declare const videojs:any
import '../../../../assets/js/videojs-transcript.js'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // debugger;
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
}



