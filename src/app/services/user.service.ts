import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import data from "../data/users.json"
import { User } from '../models/user';

const _userDb: User[] = data;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  private _userDb$ = new BehaviorSubject<User[]>([])
  public users$ = this._userDb$.asObservable()

  query() {
    const users = _userDb
    this._userDb$.next(users);
  }

  getById(userId: number): Observable<User | null> {
    const user = _userDb.find(user => user.id === userId)
    return user ? of({ ...user }) : of(null)
  }
}
