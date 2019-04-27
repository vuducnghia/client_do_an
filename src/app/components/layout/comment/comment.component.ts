import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @ViewChild('comment') CommentInput: ElementRef;
  @Input('idComment') idComment: string;

  comments = [1, 2, 3]
  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit() {
    console.log(1111111111)
    console.log(this.idComment)
    this.videoService.getCommentById(this.idComment).subscribe(comment => {
      console.log(comment)
      this.comments.push(comment)
    })
  }

  submit() {
    console.log(this.idComment)
    console.log(this.CommentInput.nativeElement.value)
    if (this.CommentInput.nativeElement.value) {
      this.comments.push(this.CommentInput.nativeElement.value)
    }
  }
}
