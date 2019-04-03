import { Component, OnInit } from '@angular/core';
import * as videojs from '../../../../assets/js/video.js'
// import * as main from '../../../../assets/videojs-transcript/src/main.js';
// import * as transcript from '../../../../assets/js/videojs-transcript.js'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    // debugger;
    var video = videojs('video').ready(function () {
      import * as transcript from '../../../../assets/js/videojs-transcript.js'
      console.log(this)
      // fire up the plugin
      var transcript1 = this.transcript();


      console.log(transcript1)
      // attach the widget to the page
      var transcriptContainer = document.querySelector('#transcript');
      transcriptContainer.appendChild(transcript1.el());
    });
  }

}
