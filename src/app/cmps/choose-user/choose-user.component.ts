import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss']
})

export class ChooseUserComponent {
  @Input() users!: User[] | null
  @Output() onSetUser = new EventEmitter<User>()

  chosenUser!: User

  constructor() { }

  consoleMe() {
    this.onSetUser.emit(this.chosenUser)
  }
}
