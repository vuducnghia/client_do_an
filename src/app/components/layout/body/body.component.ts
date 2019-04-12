import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  listCategory = []
  listObjectVideo = []
  constructor(
    private videoservice: VideoService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.listCategory = data.map(cate => {
        return cate.category;
      })
      this.listCategory.forEach(cate => {
        this.videoservice.getVideoByCategory(cate).subscribe(videos => {
          if (videos && videos[0]) {
            this.listObjectVideo.push({
              cate: cate,
              videos: videos
            })
          }
        })
      })
    }, err => {
      console.log(err)
    })


  }

}
