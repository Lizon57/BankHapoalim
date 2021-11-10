import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments!: Comment[] | null
  @Input() loggedInUser!: User
  @Output() setNewCommentParentId = new EventEmitter<number>()

  constructor() { }

  onSetNewCommentParentId(parentId: number) {
    this.setNewCommentParentId.emit(parentId)
  }

  ngOnInit(): void {
  }

}
