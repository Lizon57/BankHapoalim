import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import data from "../data/comments.json"
import { Comment } from '../models/comment';
import { UtilService } from './util.service';

const _commentDb: Comment[] = data;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private utilService: UtilService) { }

  private _comments$ = new BehaviorSubject<Comment[]>(_commentDb)
  public comments$ = this._comments$.asObservable()

  query() {
    const comments = _commentDb.filter(comment => !comment.parentCommentId).sort(this._sortByDate)
    this._comments$.next(comments)
  }

  save(comment: Comment) {
    comment.createdAt = this._getCurrDateString()
    return comment.id ? this._edit(comment) : this._add(comment)
  }

  getEmptyComment(): Comment {
    return { id: 0, parentCommentId: null, ownerId: 0, txt: '', createdAt: '', deletedAt: null }
  }

  remove(id: number) {
    const comments = _commentDb
    const relatedComments = comments.filter(comment => comment.parentCommentId === id)
    if (relatedComments.length) relatedComments.forEach(comment => this.remove(comment.id))
    const commentIdx = this._getCommentIdx(id)
    comments[commentIdx].deletedAt = new Date().toISOString()
    this._comments$.next(comments)
  }

  getRelatedComments(commentId: number) {
    const comments = _commentDb
    return comments.filter(comment => comment.parentCommentId === commentId)
  }


  private _getCommentIdx(id: number) {
    return _commentDb.findIndex(comment => comment.id === id)
  }

  private _add(comment: Comment) {
    const comments = _commentDb
    comment.id = this._getNewId()
    _commentDb.push(comment)
    this._comments$.next(comments)
    return of(comment)
  }

  private _edit(comment: Comment) {
    const comments = _commentDb
    const commentIdx = comments.findIndex(_comment => _comment.id === comment.id)
    comments.splice(commentIdx, 1, comment)
    return of(comment)
  }

  private _getCurrDateString() {
    return new Date().toISOString()
  }

  private _getNewId() {
    const comments = _commentDb
    let newId = this.utilService.makeId(1, 999999)
    let idExistence = comments.findIndex(_comment => _comment.id === newId)
    while (idExistence !== -1) {
      newId = this.utilService.makeId(1, 999999)
      idExistence = comments.findIndex(_comment => _comment.id === newId)
    }
    return newId
  }

  private _sortByDate(a: Comment, b: Comment) {
    const aDate = Date.parse(a.createdAt as string)
    const bDate = Date.parse(b.createdAt as string)
    return (aDate > bDate) ? 1 : -1
  }
}
