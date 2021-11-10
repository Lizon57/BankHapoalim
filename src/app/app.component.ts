import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Comments-proj'

  loggedInUser!: User | null;
  users$!: Observable<User[]>

  newCommentParentId!: number | null

  constructor(private userService: UserService) { }

  onSetUser(user: User) {
    this.loggedInUser = user
  }

  onSetNewCommentParentId(parentId: number | null) {
    if (!parentId) {
      this.newCommentParentId = -555;
      setTimeout(() => {
        this.newCommentParentId = null
      }, 0)
    }
    else this.newCommentParentId = parentId
  }

  onLogout() {
    this.loggedInUser = null
  }

  ngOnInit(): void {
    this.users$ = this.userService.users$
    this.userService.query()

    this.loggedInUser = { id: 1, displayName: 'Apu Nahasapeemapetilon' }
  }
}
