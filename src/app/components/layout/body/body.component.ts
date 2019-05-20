import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  listCategory = [];
  listObjectVideo = [];
  listVideoRecent = [];
  constructor(
    private videoservice: VideoService,
    private userService: UserService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.videoservice.getVideoRecent().subscribe(videos => {
      videos.forEach(video => {
        this.userService.getUserById(video.createBy).subscribe((user: any) => {
          this.listVideoRecent.push({
            views: video.views,
            owner: user.firstName + ' ' + user.lastName,
            title: video.title,
            thumbnail: video.thumbnail,
            _id: video._id
          })
        })
      });
    })
    this.categoryService.getAll().subscribe(data => {
      this.listCategory = data.map(cate => {
        return cate.category;
      })
      this.listCategory.forEach(cate => {
        this.videoservice.getVideoByCategory(cate, true).subscribe( async videos => {
          let arrVideo = []
          await videos.forEach(video => {
            this.userService.getUserById(video.createBy).subscribe((user: any) => {
              arrVideo.push({
                views: video.views,
                owner: user.firstName + ' ' + user.lastName,
                title: video.title,
                thumbnail: video.thumbnail,
                _id: video._id
              })
            })
          });

          this.listObjectVideo.push({
            cate: cate,
            videos: arrVideo
          })

        })
      })
    }, err => {
      console.log(err)
    })


  }

}
