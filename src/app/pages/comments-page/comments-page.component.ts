import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.scss']
})
export class CommentsPageComponent implements OnInit {
  @Input() loggedInUser!: User
  @Input() newCommentParentId!: number | null
  comments$!: Observable<Comment[]>
  currAddCommentParentId!: number

  constructor(private commentService: CommentService) { }

  onSetNewCommentParentId(parentId: number) {
    this.currAddCommentParentId = parentId
  }


  ngOnInit(): void {
    this.comments$ = this.commentService.comments$
    this.commentService.query()
  }
}
