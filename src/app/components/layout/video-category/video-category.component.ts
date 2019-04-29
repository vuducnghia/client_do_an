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
  constructor(
    private route: ActivatedRoute,
    private videoservice: VideoService,
    private userService: UserService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params.category === 'Film') {
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
          console.log(this.videos)
        }, err => {
          console.log(err)
        })
      }
      else if (params.category === 'English' || params.category === 'Spanish' || params.category === 'Arabic') {
        this.category = params.category;
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
          console.log(this.videos)
        })
      }
    })

  }

}
