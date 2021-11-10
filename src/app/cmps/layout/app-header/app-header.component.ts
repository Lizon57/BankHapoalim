import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() userName!: string
  @Output() logout = new EventEmitter<null>()

  constructor() { }

  onLogout() {
    this.logout.emit()
  }

  ngOnInit(): void {
  }

}
