import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  @Output() setNewCommentParentId = new EventEmitter<null>()

  constructor() { }

  onSetNewCommentParentId() {
    this.setNewCommentParentId.emit(null)
  }

  ngOnInit(): void {
  }

}
