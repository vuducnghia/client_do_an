import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-video',
  templateUrl: './my-video.component.html',
  styleUrls: ['./my-video.component.scss']
})
export class MyVideoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private videoservice: VideoService
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   console.log(params.idVideo)
    // })

    this.videoservice.getVideoByUser().subscribe(videos => {
      console.log(videos)
    }, err => {
      console.log(err)
    })
  }

}
