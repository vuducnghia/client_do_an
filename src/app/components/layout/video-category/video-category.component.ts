import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-video-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.scss']
})
export class VideoCategoryComponent implements OnInit {
  videos = [];
  category;
  listCategory = [];
  constructor(
    private route: ActivatedRoute,
    private videoservice: VideoService,
    private userService: UserService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.categoryService.getAll().subscribe(cates => {
        this.listCategory = cates.map(cate => {
          return cate.category;
        })
        this.videos = [];
        if (this.listCategory.includes(params.category)) {
          this.category = params.category;
          this.videoservice.getVideoByCategory(params.category).subscribe(videos => {
            videos.forEach(video => {
              this.userService.getUserById(video.createBy).subscribe((user: any) => {
                this.videos.push({
                  views: video.views,
                  owner: user.firstName + ' ' + user.lastName,
                  title: video.title,
                  thumbnail: video.thumbnail,
                  _id: video._id
                })
              })
            });
            // console.log(this.videos)
          }, err => {
            console.log(err)
          })
        }
      })

      if (params.category === 'English' || params.category === 'Spanish' || params.category === 'Arabic') {
        this.category = params.category;
        this.videos = [];
        this.videoservice.getVideoByLanguage(params.category, 6).subscribe(videos => {
          videos.forEach(video => {
            this.userService.getUserById(video.createBy).subscribe((user: any) => {
              this.videos.push({
                views: video.views,
                owner: user.firstName + ' ' + user.lastName,
                title: video.title,
                thumbnail: video.thumbnail,
                _id: video._id
              })
            })
          });
        })
      }
    })

  }

}
