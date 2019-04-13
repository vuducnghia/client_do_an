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



// import { Component, OnInit, Pipe, PipeTransform, AfterViewInit } from '@angular/core';
// import * as videojs from '../../../../assets/js/video.js'
// declare const videojs: any
// import '../../../../assets/js/videojs-transcript.js'
// import { ActivatedRoute } from '@angular/router';
// import { VideoService } from '../../../services/video.service';

// @Pipe({
//   name: 'dateFormatPipe',
// })
// export class dateFormatPipe implements PipeTransform {
//   transform(sec_num) {
//     let hours = Math.floor(sec_num / 3600);
//     let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     let seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));
//     let h = hours.toString(), m = minutes.toString(), s = seconds.toString();

//     if (hours < 10) { h = "0" + hours; }
//     if (minutes < 10) { m = "0" + minutes; }
//     if (seconds < 10) { s = "0" + seconds; }

//     return h + ':' + m + ':' + s;
//   }
// }

// @Component({
//   selector: 'app-video-transcript',
//   templateUrl: './video-transcript.component.html',
//   styleUrls: ['./video-transcript.component.scss']
// })
// export class VideoTranscriptComponent implements OnInit {
//   status = 'Private'
//   myPlayer
//   url
//   track
//   _this = this
//   constructor(
//     private route: ActivatedRoute,
//     private videoService: VideoService
//   ) { }


//   ngOnInit() {
//     let _this = this
//     this.route.params.subscribe(params => {
//       // console.log(params)
//       this.videoService.getVideoById(params.idVideo).subscribe((video: any) => {
//         // console.log(video)
//         if(video.thumbnail == 'c55499cbeced27fbefb2590724f9f0df'){
//           this.track = 'http://localhost:4200/assets/test.vtt'
//         }else{
//           this.track = 'http://localhost:4200/assets/test1.vtt'
//         }
//         this.url = "http://localhost:8081/api/play/" + video.thumbnail
//         console.log(this.url)
//         this.init()
//         this.start_viblast(this.url)
        

        
//       })
//     })
//   }
//   init(){
//     const player = videojs('video', {
//       tracks: [
//         { src: this.track, kind: 'captions', srclang: 'en', label: 'English' }
//       ]
//     }).ready(function () {
//       // fire up the plugin
//       // this['transcript'] = transcript

//       const transcriptElem = this.transcript({
//         autoscroll: true,
//         clickArea: 'text',
//         showTitle: true,
//         showTrackSelector: true,
//         followPlayerTrack: true,
//         scrollToCenter: false,
//         stopScrollWhenInUse: true,
//       })
//       // console.log('transcript', transcriptElem)
//       // attach the widget to the page
//       const transcriptContainer = document.querySelector('#transcript');
//       transcriptContainer.appendChild(transcriptElem.el());
//     });
//   }
  
//   start_viblast(url) {
//     console.log(videojs('#video'))

//     videojs('#video', {});
//     videojs('#video').src({ type: 'video/mp4', src: url });

//   }

//   reset() {
//     console.log('reset')
//     videojs('#video').reset();
//     videojs('#video').dispose()
//     console.log(videojs('#video'))
//     videojs('#video').src({ type: 'video/mp4', src: this.url });
//   }

//   changeStatus() {
//     this.status = 'Request Public'
//   }
// }
