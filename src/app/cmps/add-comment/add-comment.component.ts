import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() loggedInUser!: User
  @Input() parentId!: number
  @Input() outsideParentId!: number | null
  comment!: Comment
  fixedParentId!: number | null

  constructor(private commentService: CommentService) { }

  async onAddComment() {
    if (!this.comment.txt) return
    this.comment.parentCommentId = this.fixedParentId
    const newComment = await this.commentService.save(this.comment).toPromise()
    if (newComment) this.setEmptyComment()
  }

  setEmptyComment() {
    this.comment = this.commentService.getEmptyComment()
    this.comment.ownerId = this.loggedInUser.id
    if (!this.fixedParentId) this.comment.parentCommentId = null
    else this.fixedParentId = this.parentId
  }

  clearParentId() {
    this.fixedParentId = null
  }

  ngOnInit(): void {
    this.setEmptyComment()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.outsideParentId) this.fixedParentId = this.outsideParentId
    else this.fixedParentId = this.parentId
  }
}
