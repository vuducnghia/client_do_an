import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @ViewChild('comment') CommentInput: ElementRef;
  @Input('idComment') idComment: string;

  listSubComments = [];
  mainComment: any = {};
  reply = false;
  userCurrent;
  constructor(
    private videoService: VideoService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userCurrent = this.authService.currentUserValue;

    this.videoService.getCommentById(this.idComment).subscribe(comment => {

      this.userService.getUserById(comment.createBy).subscribe((user: any) => {
        this.mainComment = comment;
        this.mainComment.avatar = user.avatar;
        this.mainComment.name = user.firstName + ' ' + user.lastName;
        comment.subContent.forEach(element => {
          this.userService.getUserById(element.createBy).subscribe((user: any) => {
            this.listSubComments.push({
              content: element.content,
              createBy: element.createBy,
              created: element.created,
              avatar: user.avatar,
              name: user.firstName + ' ' + user.lastName
            })
          })
        });

      });
    })
  }

  submit() {
    if (!this.userCurrent) {

    } else {
      let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      // document.write(utc);
      if (this.CommentInput.nativeElement.value) {
        let subComment = {
          content: this.CommentInput.nativeElement.value,
          createBy: this.userCurrent.id
        }
        this.mainComment.subContent.push(subComment);
        this.listSubComments.push(
          {
            content: this.CommentInput.nativeElement.value,
            created: utc,
            avatar: this.userCurrent.avatar,
            name: this.userCurrent.name

          });
          this.CommentInput.nativeElement.value= ''
        this.videoService.updateCommentById(this.mainComment._id, this.mainComment.subContent).subscribe(result => {
        })
      }
    }

  }

  changReply() {
    this.reply = true;
  }
}
