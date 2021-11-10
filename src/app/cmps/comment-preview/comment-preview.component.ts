import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentPreviewComponent implements OnInit {
  @Input() comment!: Comment
  @Input() loggedInUser!: User
  @Output() setNewCommentParentId = new EventEmitter<number>()
  commentCopy = { ...this.comment }
  commentOwner!: string
  isEditing = false
  relatedComments!: Comment[]

  constructor(private userService: UserService, private commentService: CommentService) { }

  async saveOrEditComment() {
    if (this.isEditing) {
      const comment = await this.commentService.save(this.commentCopy).toPromise()
      this.comment = comment
    }
    this.isEditing = !this.isEditing
  }

  onRemoveComment() {
    this.commentService.remove(this.commentCopy.id)
  }

  onSetNewCommentParentId(commentId: number) {
    this.setNewCommentParentId.emit(commentId)
  }

  async ngOnInit(): Promise<any> {
    this.commentCopy = { ...this.comment }
    this.relatedComments = this.commentService.getRelatedComments(this.commentCopy.id)

    await this.userService.getById(this.comment.ownerId).toPromise()
      .then(user => this.commentOwner = user!.displayName)
  }

  ngOnChanges() {
  }
}


