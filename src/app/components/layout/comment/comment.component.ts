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
  mainComment;
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
      console.log(comment)
      this.mainComment = comment;
      this.userService.getUserById(comment.createBy).subscribe((user: any) => {
        comment.subContent.forEach(element => {
          this.listSubComments.push({
            comment,
            avatar: user.avatar,
            name: user.name
          })
        });
        console.log(this.listSubComments)
      });
    })
  }

  submit() {
    if (!this.userCurrent) {

    } else {
      if (this.CommentInput.nativeElement.value) {
        let subComment = {
          content: this.CommentInput.nativeElement.value,
          createBy: this.userCurrent.id
        }
        console.log(subComment)
        this.mainComment.subContent.push(subComment);

        // this.listSubComments.push(this.CommentInput.nativeElement.value);
        console.log(this.mainComment.subContent);
        this.videoService.updateCommentById(this.mainComment._id, this.mainComment.subContent).subscribe(result => {
          console.log(result)
        })
      }
    }

  }

  changReply() {
    this.reply = true;
  }
}
