import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './user.model';

/**
 * UserService manages our current user , (We can know who the current user is immediately)
 *
 *  Subject ("read/write" stream) inherited from both Observable and Observer
 *  BehaviorSubject - it stores the last value
 *
 * Consequences of streams is that a new subscriber risks missing the latest value of the stream
 * Behavior Subject will compensate for it
 */

@Injectable()
export class UsersService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [UsersService];
