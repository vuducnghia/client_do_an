import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-my-video',
  templateUrl: './my-video.component.html',
  styleUrls: ['./my-video.component.scss']
})
export class MyVideoComponent implements OnInit {
  listCategory = new Set()
  listObjectVideo = []
  constructor(
    private route: ActivatedRoute,
    private videoservice: VideoService
  ) { }

  ngOnInit() {
    // $('.btn').button('loading');

    this.videoservice.getVideoByUser().subscribe(arrvideos => {
      arrvideos.forEach(video => {
        this.listCategory.add(video.category)
      })
      this.listCategory.forEach(cate => {
        let videos = [];
        arrvideos.forEach(video => {
          if (video.category === cate)
            videos.push(video)
        })
        this.listObjectVideo.push({ videos: videos, cate: cate })
      })

    }, err => {
      console.log(err)
    })
  }

}
